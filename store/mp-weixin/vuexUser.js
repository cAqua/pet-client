import {
	userLoginApi,
	ifStorte
} from "@/store/mp-weixin/Weapp-User-Api.js";




export default {
	namespaced: true,
	state: {
		userInfo: {username: "Hi,您尚未登录",img: "/static/mp-weixin/icon/default-portrait.png",},

	},
	mutations: {
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


		async Registered(state,info) { //用户注册
			// console.log(state);
			return await new Promise((resolve, reject) => {

				// let info = uni.getStorageSync('UserInfo');
				state;
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