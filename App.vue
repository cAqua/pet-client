<script>
	export default {
		globalData: {}, //全局属性 通过 getApp().globalData.*** 读取变量

		onLaunch: function() { //全局出发一次
			
			//判断当前是否选择了角色 看是否弹窗让用户选择
			this.$store.state.home.UmaskFlag = uni.getStorageSync('UserType').length > 0 ?  false : true 

		},
		onShow: function() {

		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	/*每个页面公共css */

	/* #ifdef MP-WEIXIN */
	@import "@/UI/uView/index.scss";
	@import '@/src/mp-weixin/style/base.wxss';
	/* 标签初始化样式 */
	/* #endif */
	@import '@/src/mp-weixin/style/iconfont.wxss';
	/* uni_icon */
</style>
