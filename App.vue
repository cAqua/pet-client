

<script>
	export default {
		globalData: {}, //全局属性 通过 getApp().globalData.*** 读取变量
		
		onLaunch: function() {
		},
		onShow: function() {
			
		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">/*每个页面公共css */
	
	/* #ifdef MP-WEIXIN */
	@import "@/UI/uView/index.scss";
	@import '@/src/weixin/style/base.wxss'; /* 标签初始化样式 */
	/* #endif */
	@import '@/src/weixin/style/iconfont.wxss'; /* uni_icon */
	
</style>
