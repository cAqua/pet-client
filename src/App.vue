<template>
	
</template>


<script>
	export default {
		onLaunch: function() {


			uni.onTabBarMidButtonTap(function(){
				console.log('dianji');
			})
			
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './style/base.wxss'; /* 标签初始化样式 */
	@import './style/iconfont.wxss'; /* uni_icon */
</style>
