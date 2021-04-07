import {
	userLoginApi
} from "@/store/mp-weixin/Weapp-User-Api.js";
// import { reject, resolve } from "core-js/fn/promise";




export default {
	namespaced: true,
	state: {

		$tcolor: '#2979ff', //全局主体颜色
		getUserInfoFlag: true, //防止多次点击登录

	},
	mutations: {
		getUserInfoFlag(state) { //防止多次点击登录框
			state.getUserInfoFlag = false;
		},

		userlogout(state) { //注销

			uni.removeStorage({
				key: 'UserInfo',
				success: () => {
					uni.removeStorage({
						key:'UserType',
						success:()=>{
							uni.showToast({
								title: '请刷新重新登录',
								icon: 'success',
								// success:()=>{
								// 	setTimeout(function(){
								// 		uni.navigateTo({
								// 			url:'/platforms/mp-weixin/y-cosplayMask/index'
								// 		})
								// 	},2000)
								// }
							})
						}
					})
				}
			})
		}




	},
	actions: {
		//封装一个 promise这个功能可以根据 状态返回 成功与否做操作
		async userLogin(state, silent, hint) {
			//获取用户数据 && 唯一id openid

			const info = await new Promise((resolve, reject) => {

				let info = Object;

				try {

					uni.getUserProfile({
						desc: '获取用户信息登录',
						success: (this_info) => {

							uni.login({ //wx_code
								provider: "weixin",
								success: function (wxCode) {
									let appid = "wx2603e459c7f9b084";
									let secret = "9fd640b3208f6e196258b7b9324d0504";
									let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + wxCode.code + "&grant_type=authorization_code";

									uni.request({ //openid
										url: url, // 请求路径
										success: (result) => {

											info = {
												id: result.data.openid, //唯一id
												usernmae: this_info.userInfo.nickName, //name
												img: this_info.userInfo.avatarUrl, //头像
												place: `${this_info.userInfo.country}-${this_info.userInfo.city}`, //中国--XX
												source: "weixin", //来源
												userlongitude: "116.3971281", //经度
												userlaitude: "39.9165271", //纬度
												UserType:'user',
											};
											resolve(info)

										},
										fail: (error) => {
											console.warn('获取openid错误' + error)
											reject()
										},
									});
								},
								fail: (error) => {
									console.warn('获取wx_code错误' + error)
									reject()
								},
							});

						},
						fail: (error) => {
							//点击了取消授权
							console.warn('用户拒绝了授权');
							reject('refuse')
						}
					})

				} catch (error) {
					console.log('捕获获取openid异常');
				}

			})

			return await new Promise((resolve, reject) => {

				try {

					userLoginApi(info, silent || hint) //当前调用 使用静默登录 || 有提示框的登录
						.then(res => {


							if (res.data.code == 0) { uni.showToast({ title: '登录失败请再次点击登录按钮' }) }
							else if (res.data.code == -1) {

								if (res.data.desc == '插入成功' || '用户已经存在') {
									uni.setStorage({
										key: "UserInfo",
										data: info,
										success: () => {
											resolve(res.data.desc)
										},
										fail: () => {
											return uni.showToast({ title: "存储用户信息错误" });
										},
									}); //用户信息存在本地
								}
								else {
									reject(res.desc);
								}

							}

						})
						.catch(error => {
							return console.warn('登录异常');
						})

				} catch (error) {

					console.log('抛出异常' + error);

				}

			})

		},
		async judgment_Login_Status(){ //判断当前是否是登录状态 封装成promise 返回状态

		},


	}

}



