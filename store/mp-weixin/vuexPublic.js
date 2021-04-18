import {
	userLoginApi,
	ifStorte
} from "@/store/mp-weixin/Weapp-User-Api.js";
// import { reject, resolve } from "core-js/fn/promise";
// import { resolve } from "core-js/fn/promise";

export default {
	namespaced: true,
	state: {
		$tcolor: '#2979ff', //全局主体颜色
		openid: '', //id
		userType: '', //用户类型
		userInfo: { username: "Hi,您尚未登录", img: "/static/mp-weixin/icon/default-portrait.png", },

	},
	mutations: {
		userlogout (state) { //注销

			uni.removeStorage({
				key: 'UserInfo',
				success: () => {
					uni.showToast({
						title: '注销成功',
						icon: 'success',
						success: () => {
							state.userInfo = { username: "点击登录", img: "/static/mp-weixin/icon/default-portrait.png", };
						}
					})
				}
			})
		},

	},
	actions: {
		async getStorageUserInfo (state) { //获取用户 id 与类型
			return new Promise(resolve => {
				let { id, UserType } = uni.getStorageSync('UserInfo');
				resolve({ id, UserType })
			})

		},
		async IfRegistered (state, silent, hint) { //处理用户是否注册`	
			return new Promise((resolve, reject) => {
				try {


					uni.login({ //wx_code
						provider: "weixin",
						success: function (wxCode) {
							let appid = uni.getAccountInfoSync().miniProgram.appId;
							let secret = "9fd640b3208f6e196258b7b9324d0504";
							let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + wxCode.code + "&grant_type=authorization_code";

							uni.request({ //openid
								url: url, // 请求路径
								success: (result) => {

									ifStorte({ id: result.data.openid }) //用户是否存在api 
										.then(res => { //已注册本地无数据 || 更换设备登录

											if (res.data.desc === '用户已经存在') {      //就不需要注册了 要调用按钮 授权新信息
												// state.openid = res.data.data[0].id; //后端的openid
												// state.userType = res.data.data[0].UserType //用户类型
												resolve(res.data) //返回用户id 类型
												// console.log(state.openid);
											} else if (res.data.desc === '用户未注册') {
												// res.data.id = state.openid = result.data.openid
												res.data.id = result.data.openid
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
							// console.warn('获取wx_code错误' + error)
							console.log(error);
							reject()
						},
					});

				} catch (error) {
					console.log('捕获获取openid异常');
				}

			})



		},
		async getUserInfo (state, info) { //获取用户 信息
			let _info = info;
			return new Promise((resolve, reject) => {
				uni.getUserProfile({
					desc: '获取用户信息登录',
					success: (this_info) => {

						let info = {
							id: _info.id, //唯一id
							usernmae: this_info.userInfo.nickName, //name
							img: this_info.userInfo.avatarUrl, //头像
							place: `${this_info.userInfo.province}-${this_info.userInfo.city}`, //中国--XX
							source: "weixin", //来源
							UserType: _info.UserType
						};
						resolve(info);
					},
					fail: (error) => {
						//点击了取消授权
						// console.warn('用户拒绝了授权');
						reject('refuse')
					}
				})
			})
		},
		async getUserPosition (state) {

			function getLocation () { //获取地理位置
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: "gcj02",
						success: (res) => {
							let { latitude, longitude } = res;
							resolve({ longitude,latitude  })
						},
						fail: (err) => { resolve(err) }
					})
				})
			}

			let authorizeStatus = new Promise((resolve, reject) => {//负责处理 授权状况

				// const { locationEnabled } = uni.getSystemInfoSync();

				// if (locationEnabled != true) {
				// 	uni.showToast({
				// 		title: '定位失败:请打开手机GPS后在点击定位按钮重试',
				// 		icon: 'none',
				// 		duration:2300
				// 	})
				// 	return reject('GPSnotOpen')
				// }

				uni.getSetting({
					success: (res) => {
						console.log('userLocation  ' + res.authSetting['scope.userLocation']);
						if (res.authSetting['scope.userLocation']) {
							//已经取得授权获取信息
							console.warn('已经取得授权 直接获取');
							resolve()
						} else {	//未取得授权 弹窗 获取
							console.warn('未取得授权 弹窗 获取');
							uni.authorize({
								scope: "scope.userLocation",
								success: () => { //确定 获取位置
									return resolve()
								},
								fail: (err) => { // 拒绝获取位置 用户点了拒绝 || 可能已经点过一次 解决
									return reject(err); // 拒绝授权
								},
							});
						}
					},
					fail: (err) => { console.log('获取用户设置失败' + err); }
				})

			})

			return new Promise((resolve, reject) => {

				authorizeStatus.then(res => {//同意授权

					getLocation().then(res => { resolve(res); }) //获取数据并返回

				}).catch(err => {//用户解决授权 提示信息再次请求授权

					if(err === 'GPSnotOpen'){
						return reject('定位失败,请点击定位按钮重试')
					}

					uni.showModal({
						title: "请求授权当前位置",
						content: "我们需要获取地理位置信息，为您推荐附近的店铺",
						success: (res) => {
							if (res.confirm) {
								uni.openSetting().then((res) => {
									if (res[1].authSetting["scope.userLocation"] === true) {
										getLocation().then(res => resolve(res))
									} else {
										uni.showToast({ title: '拒绝授权,可再次点击定位按钮触发定位', icon: 'none', duration: 2300, })
										reject('拒绝');
									}
								});
							} else if (res.cancel) {
								uni.showToast({ title: '拒绝授权,可再次点击定位按钮触发定位', icon: 'none', duration: 2300, })
								reject('拒绝');
							}
						},
					});

				})

			})



		},
	







	}






}