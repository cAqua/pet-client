<template>
	<view class="MyBody">
		<view class="MyContent">
			<button open-type="getUserInfo" @click="getuserinfo()">获取用户信息</button>
		</view>
		<u-tabbar :list="tabbar" :mid-button="true" active-color=#007aff :before-switch="beforeSwitch">
		</u-tabbar>
	</view>
</template>

<script>
	import {getUserInfoApi} from '@/store/Weapp-User-Api.js';
	export default {
		data() {
			return {
				tabbar:this.$vuex.state.uViewTabBar  //刷新tabbar
			}
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
		onLoad() {

		},
		onShow(){
		
		},
	}
</script>

<style lang="scss" scoped>

</style>
