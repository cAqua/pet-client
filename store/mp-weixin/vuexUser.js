import {
	getUserInfoApi
} from "@/store/mp-weixin/Weapp-User-Api.js";
// import { reject } from "core-js/fn/promise";




export default {
	namespaced: true,
	state: {
		uViewTabBar: [ //定义tabbar
			{
				iconPath: "/static/mp-weixin/icon/home.png",
				selectedIconPath: "/static/mp-weixin/icon/_home.png",
				text: '首页',
				count: 0,
				isDot: true,
				pagePath: "/platforms/mp-weixin/y-home/index",

			},
			{
				iconPath: "/static/mp-weixin/icon/PetCrcle.png",
				selectedIconPath: "/static/mp-weixin/icon/_PetCrcle.png",
				text: '宠物圈',
				midButton: true,
				pagePath: "/platforms/mp-weixin/y-PetCrcle/index"
			},
			{
				iconPath: "/static/mp-weixin/icon/my.png",
				selectedIconPath: "/static/mp-weixin/icon/_my.png",
				text: '我的',
				pagePath: "/platforms/mp-weixin/y-my/index"
			},
		],
		$tcolor: '#2979ff', //全局主体颜色
		UmaskFlag: false, //遮罩层
		getUserInfoFlag: true, //防止多次点击登录
		userInfo: {
			usernmae: "Hi,您尚未登录",
			img: "../../../static/mp-weixin/icon/default-portrait.png",
		}, //用户数据
	},
	mutations: {
		getUserInfoFlag(state) {
			state.getUserInfoFlag = false;
		},
		async userLogin(state) {
				//获取用户数据 && 唯一id openid

				const info = await new Promise((resolve, reject) => {

				let info = Object;

				uni.getUserProfile({
					desc: '获取用户信息登录',
					success: (this_info_1) => {

						uni.login({
							provider: "weixin",
							success: function (wxCode_1) {
								let appid = "wx2603e459c7f9b084";
								let secret = "9fd640b3208f6e196258b7b9324d0504";
								let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + wxCode_1.code + "&grant_type=authorization_code";

								uni.request({
									url: url,
									success: (result_1) => {

										info = {
											id: result_1.data.openid,
											usernmae: this_info_1.userInfo.nickName,
											img: this_info_1.userInfo.avatarUrl,
											place: `${this_info_1.userInfo.country}-${this_info_1.userInfo.city}`,
											source: "weixin",
											userlongitude: "116.3971281",
											userlaitude: "39.9165271", //纬度
										};
										resolve(info);

									},
									fail: (error_1) => {
										return reject(console.warn(error_1));
									},
								});
							},
							fail: (error_3) => {
								return reject(console.warn(error_3));
							},
						});

					},
					fail: (error_5) => {
						//点击了取消授权
						console.warn(error_5);
						uni.showToast({
							title: "请允许授权",
							icon: "none",
						});
					}
				});

			});
			 
			return await new Promise((resolve_1, reject_1) => {

				getUserInfoApi(info)
					.then(res => {

						if (res.data.code == 0) { uni.showToast({ title: '登录失败请再次点击登录按钮' }); }
						else if (res.data.code == -1) {

							if (res.data.desc == '插入成功' || '用户已经存在') {

								uni.setStorage({
									key: "UserInfo",
									data: info,
									success: () => {
										uni.showToast({
											// title: '登录成功',
											icon: 'success'
										}),
											state.userInfo = info;
										state.thatUserInfo = false;
										res.resolve_1();
									}
								}); //用户信息存在本地
							}
							else {
								return reject_1(res.data.desc);
							}

						}

					})
					.catch(error_6 => {
						return console.warn(error_6);
					});

			});

		},
		userlogout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		}


	}
}



// userLogin(state) {
// 	//获取用户数据 && 唯一id openid

// // return  new Promise((resolve,reject)=>{


// 	return new Promise((resolve, reject) => { 

// 		let info = Object;

// 		uni.getUserProfile({
// 			desc: '获取用户信息登录',
// 			success: (this_info) => {

// 				uni.login({ //wx_code
// 					provider: "weixin",
// 					success: function (wxCode) {
// 						let appid = "wx2603e459c7f9b084";
// 						let secret = "9fd640b3208f6e196258b7b9324d0504";
// 						let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + wxCode.code + "&grant_type=authorization_code";

// 						uni.request({ //openid
// 							url: url, // 请求路径
// 							success: (result) => {

// 								info = {
// 									id: result.data.openid, //唯一id
// 									usernmae: this_info.userInfo.nickName, //name
// 									img: this_info.userInfo.avatarUrl, //头像
// 									place: `${this_info.userInfo.country}-${this_info.userInfo.city}`, //中国--XX
// 									source: "weixin", //来源
// 									userlongitude: "116.3971281", //经度
// 									userlaitude: "39.9165271", //纬度
// 								};
// 								resolve(info)

// 							},
// 							fail: (error) => {
// 								return reject(console.warn(error))
// 							},
// 						});
// 					},
// 					fail: (error) => {
// 						return reject(console.warn(error))
// 					},
// 				});

// 			},
// 			fail: (error) => {
// 				//点击了取消授权
// 				console.warn(error);
// 				uni.showToast({
// 					title: "请允许授权",
// 					icon: "none",
// 				});
// 			}
// 		})

// 	})
// 	.then(info => { //插入数据

// 		return new Promise((resolve, reject) => {

// 			getUserInfoApi(info)
// 				.then(res => {

// 					if (res.code == 0) {uni.showToast({title: '登录失败请再次点击登录按钮'})} 
// 					else if (res.code == -1) {

// 						if (res.desc == '插入成功' || '用户已经存在') {

// 							uni.setStorage({
// 								key: "UserInfo",
// 								data: info,
// 								success: () => {
// 									uni.showToast({
// 											// title: '登录成功',
// 											icon: 'success'
// 										}),
// 										state.userInfo = info;
// 									state.thatUserInfo = false;
// 									resolve()
// 								}
// 							}); //用户信息存在本地
// 						}
// 						else {
// 							return reject(res.desc);
// 						}

// 					}

// 				})
// 				.catch(error => {
// 					return console.warn(error);
// 				})

// 		})

// 	})


	
	
	
	
// // })




// },