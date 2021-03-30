import {getUserInfoApi} from "@/store/mp-weixin/Weapp-User-Api.js";


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
		getUserInfoFlag:true, //防止多次点击登录
		userInfo: {
				usernmae: "Hi,您尚未登录",
				img: "../../../static/mp-weixin/icon/default-portrait.png",
		}, //用户数据
	},
	mutations: {
		getUserInfoFlag(state){
			state.getUserInfoFlag = false;
		},
		userLogin(state, userInfo) {

			let thatUserInfo = Object;

			if (userInfo) {

				let loginRes = new Promise((resolve, reject) => {

					uni.login({
						provider: "weixin",
						success: function (res) {
							let appid = "wx2603e459c7f9b084";
							let secret = "9fd640b3208f6e196258b7b9324d0504";
							let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + res.code + "&grant_type=authorization_code";
							uni.request({ //openid
								url: url, // 请求路径
								success: (result) => {
									
									let info = {
										id: result.data.openid, //唯一id
										usernmae: userInfo.nickName, //name
										img: userInfo.avatarUrl, //头像
										place: `${userInfo.country}-${userInfo.city}`, //中国--XX
										source: "weixin", //来源
										userlongitude: "116.3971281", //经度
										userlaitude: "39.9165271", //纬度
									};
									resolve(info)
								},
							});
						},
						fail: (error) => {
							return reject(console.warn(error))
						},
					});

				})

				loginRes.then((loginRes) => {

					return new Promise((resolve, reject) => {
						getUserInfoApi(loginRes)
							.then(res => {
								if (res.code == 0) {
									uni.showToast({
										title: '登录失败请再次点击登录按钮'
									})
								} else if (res.code == -1) {
									if (res.desc == '用户已经存在' || '插入成功') {

										uni.setStorage({
											key: "UserInfo",
											data: loginRes,
											success: () => {
												uni.showToast({
													title: '登录成功',
													icon: 'success'
												}),
												state.userInfo = loginRes;
												state.thatUserInfo = false;
												resolve()
											}
										}); //用户信息存在本地

									} else {
										return console.error('出现错误' + res.desc);
									}
								}

							})
							.catch(error => {
								return console.error(error);
							})

					})

				})


			} else {
				//点击了取消授权
				uni.showToast({
					title: "请允许授权",
					icon: "none",
				});
			}

			// console.log(
			// 	thatUserInfo
			// );

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