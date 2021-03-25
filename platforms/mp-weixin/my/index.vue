<template>
	<view class="MyBody">


		<my-personage v-if="UserType === 'user'"></my-personage>
		
		<my-merchant v-if="UserType === 'merchant'"></my-merchant>

		<!-- 自定义rabbar栏 -->
		<u-tabbar :list="tabbar" :mid-button="true" :active-color=$tcolor :before-switch="beforeSwitch">
		</u-tabbar>

	</view>
</template>

<script>
	import {
		getUserInfoApi
	} from '@/store/mp-weixin/Weapp-User-Api.js'; //请求
	export default {
		data() {
			return {
				tabbar: this.$vuex.state.uViewTabBar, //刷新tabbar
				$tcolor: this.$vuex.state.$tcolor, //全局主题颜色
				UserType:uni.getStorageSync("UserType") //当前是 用户 || 商家
		}
		},
		onLoad() {


		},
		methods: {

			getuserinfo() { //获取用户信息



				// uni.getProvider({
				// 	service: 'oauth',
				// 	success: function(facilitator) {
				// 		uni.login({ // 登录
				// 			provider: facilitator,
				// 			timeout: 5000,
				// 			success: function(loginRes) {
				// 				uni.getUserInfo({ //获取用户信息
				// 					provider: facilitator,
				// 					lang: 'zh_CN',
				// 					success: function(infoRes) {
				// 						console.log(infoRes)
				// 						let userInfo = infoRes.userInfo;
				// 						getUserInfoApi({ //插入用户表
				// 								"id": infoRes.iv,
				// 								"usernmae": userInfo.nickName,
				// 								"img": userInfo.avatarUrl,
				// 								"place": userInfo.city,
				// 								"source": "weixin",
				// 							})
				// 							.then(res => {
				// 								console.log(res)
				// 							})
				// 					},
				// 					fail: function(error) {
				// 						console.log(error)
				// 					}
				// 				});
				// 			},
				// 		})
				// 	},
				// 	reject: function(error) {

				// 	}
				// })












				//获取用户信息
			},

			beforeSwitch(index) { //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
				// console.log(index)
				return true;
			},
		},

		onShow() {

		},
	}
</script>

<style lang="scss" scoped>
	.MyBody {

		// //个人信息
		// .personalInfo {
		// 	display: flex;
		// 	align-items: center;
		// 	width: 750rpx;
		// 	height: 240rpx;
		// 	padding: 20rpx;
		// 	background: #fb6f18;

		// 	.info {
		// 		width: 100%;
		// 		display: flex;

		// 		.portrait {
		// 			flex: 2;
		// 			font-size: 38rpx;

		// 			image {
		// 				width: 150rpx;
		// 				height: 150rpx;
		// 			}
		// 		}

		// 		.name {
		// 			flex: 8;
		// 			display: flex;
		// 			justify-content: space-between;
		// 			align-items: center;
		// 			padding-left: 20rpx;
		// 			font-size: 38rpx;
		// 			color: #FFFFFF;
		// 			.icon {
		// 				uni-icons {}
		// 			}
		// 		}

		// 	}
		// }



	}
</style>
