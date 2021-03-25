<template>
	<view class="MyBody">
		<view class="personalInfo">
			<view class="info">
				<view class="portrait">
					<image :src="userPortrait"></image>
				</view>

				<view class="name">
					<view>

						<button open-type="getUserInfo" @click="getuserinfo()">{{userName}}</button>
					</view>

					<view class="icon">
						<uni-icons type="arrowright" size="18" color="#ffffff"></uni-icons>
					</view>
				</view>

				<view> </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserInfoApi} from "@/store/mp-weixin/Weapp-User-Api.js"; //请求
	export default {
		data() {
			return {
				tabbar: this.$vuex.state.uViewTabBar, //刷新tabbar
				$tcolor: this.$vuex.state.$tcolor, //全局主题颜色
				roleIspersonage: "", //选择了用户还是商家
				roleISmerchant: "",
				userPortrait: '../../../static/mp-weixin/icon/default-portrait.png', //头像
				userName: 'Hi,您尚未登录',
			};
		},
		created() {



		},
		methods: {
getuserinfo() {


				let thatFacilitator = ''
				

				// let getProvider = new Promise((resolve, reject) => { //返回服务商
				// 	uni.getProvider({
				// 		service: "oauth",
				// 		success: (facilitator) => {
				// 			thatFacilitator = facilitator.service;
				// 			// console.log("facilitator: ",facilitator);
				// 			resolve(facilitator)
				// 		},
				// 		fail: (error) => console.log(error),
				// 	});
				// });

				// let infoResValue = getProvider.then(() => {
				// 	return new Promise((resolve, reject) => {
				// 		uni.login({
				// 			provider: thatFacilitator,
				// 			timeout: 5000,
				// 			lang: "zh_CN",
				// 			success: (loginRes) =>{
				// 				console.log("loginRes: ",loginRes);
				// 				resolve(loginRes);
				// 			},
				// 			fail: (error) => console.log(error),
				// 		});
				// 	});
				// });




				// infoResValue.then((loginRes) => {
					return new Promise((resolve, reject) => {
						uni.getUserInfo({
							// provider: thatFacilitator,
							provider: 'weixin',
							lang: "zh_CN",
							success: (infoRes) => {
								this.userPortrait = infoRes.userInfo.avatarUrl
								this.userName = infoRes.userInfo.nickName
								console.log(infoRes)
								uni.showToast({
									title:'登录成功',
									icon:'success'
								})
							},
							fail: (error) => console.warn(error),
							complete: i =>{}
						});
					});
					// console.log(loginRes);
				// });

			},

			beforeSwitch(index) {
				//切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
				// console.log(index)
				return true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.MyBody {

		//个人信息
		.personalInfo {
			display: flex;
			align-items: center;
			width: 750rpx;
			height: 240rpx;
			padding: 20rpx;
			background: linear-gradient(to top right, #bbdefa, $tcolor);

			.info {
				width: 100%;
				display: flex;

				.portrait {
					flex: 2;
					font-size: 38rpx;

					image {
						width: 150rpx;
						height: 150rpx;
					}
				}

				.name {
					flex: 8;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-left: 20rpx;
					font-size: 38rpx;
					color: #ffffff;

					.icon {
						uni-icons {}
					}
				}
			}
		}
	}
</style>
