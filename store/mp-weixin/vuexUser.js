import {
	userLoginApi,
	ifStorte
} from "@/store/mp-weixin/Weapp-User-Api.js";
// import { reject, resolve } from "core-js/fn/promise";
// import { reject, resolve } from "core-js/fn/promise";




export default {
	namespaced: true,
	state: {
		$tcolor: '#2979ff', //全局主体颜色
		getUserInfoFlag: true, //防止多次点击登录
		openid: '', //id
		userType:'', //用户类型
		userInfo: {
			username: "Hi,您尚未登录",
			img: "/static/mp-weixin/icon/default-portrait.png",
		},

	},
	mutations: {
		getUserInfoFlag(state) { //防止多次点击登录框
			state.getUserInfoFlag = false;
		},
		 userlogout(state) { //注销

			uni.removeStorage({
				key: 'UserInfo',
				success: () => {
					uni.showToast({
						title: '注销成功',
						icon: 'success',
						success: () => {
							state.userInfo = {username: "点击登录",img: "/static/mp-weixin/icon/default-portrait.png",};
						}
					})
				}
			})
		}





	},
	actions: {

		async IfRegistered(state, silent, hint) { //处理用户是否注册


			// console.log(state.openid);
			// console.log(state.UserType);

			return new Promise((resolve, reject) => {
				try {
					uni.login({ //wx_code
						provider: "weixin",
						success: function (wxCode) {
							let appid = "wx2603e459c7f9b084";
							let secret = "9fd640b3208f6e196258b7b9324d0504";
							let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + wxCode.code + "&grant_type=authorization_code";

							uni.request({ //openid
								url: url, // 请求路径
								success: (result) => {

									ifStorte({id: result.data.openid}) //用户是否存在api 
										.then(res => { //已注册本地无数据 || 更换设备登录
											
											if(res.data.desc === '用户已经存在'){      //就不需要注册了 要调用按钮 授权新信息
												state.openid = res.data.data[0].id; //后端的openid
												state.userType = res.data.data[0].UserType //用户类型
												resolve(res.data) //返回用户id 类型
												// console.log(state.openid);
											}else if(res.data.desc === '用户未注册'){
												res.data.id = state.openid = result.data.openid
												// console.log(res.data);
												resolve(res.data) //返回用户id 类型
											}
										})
										.catch(err => {
											console.warn("用户是否存在api错误" + err);
											reject()
										})

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

				} catch (error) {
					console.log('捕获获取openid异常');
				}

			})



		},
		async getUserInfo(state,info) { //获取用户 信息
			
			let _info = info
			
			return new Promise((resolve, reject) => {
				
				
				uni.getUserProfile({
					desc: '获取用户信息登录',
					success: (this_info) => {

						
		
						let info = {
							id: _info.id, //唯一id
							usernmae: this_info.userInfo.nickName, //name
							img: this_info.userInfo.avatarUrl, //头像
							place: `${this_info.userInfo.country}-${this_info.userInfo.city}` || '用户没有位置信息', //中国--XX
							source: "weixin", //来源
							UserType: _info.UserType
						};

						// console.log(info.place.length);

						uni.setStorage({ //用户信息
							key:'UserInfo',
							data:info,
							success: () => {
								uni.setStorage({
									key: 'UserType',	//客户类型 商家 || 用户
									data: _info.UserType,
									success:()=>resolve('授权成功')
								})
								// console.log('授权用户信息成功');
								
							},
							fail: () => {
								return uni.showToast({
									title: '存储类型错误',
								})
							},
						})

			

					},
					fail: (error) => {
						//点击了取消授权

						console.warn('用户拒绝了授权');
						reject('refuse')
					}
				})


			})

		},
		async Registered(state,silent,hint) { //用户注册
			// console.log(state);
			return await new Promise((resolve, reject) => {

				let info = uni.getStorageSync('UserInfo');
				// console.log(info);
				
				try {

				userLoginApi(info) //当前调用 使用静默登录 || 有提示框的登录
					.then(res => {


						if (res.data.code == 0) {
							uni.showToast({title: '注册失败'})
						} else if (res.data.code == -1) {

							if (res.data.desc === '插入成功') {
								console.log('插入成功');
								resolve(res.data) //抛出状态信息


							} else {
								console.log(res);
								// console.log('reject');
								reject(res.desc);
								uni.showToast({
									title:'插入失败'
								})
							}

						}

					})
					.catch(error => {
						return console.warn(error);
					})

				} catch (error) {

					console.log('抛出异常' + error);

				}

			})

		},





	}

}