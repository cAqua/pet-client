

<script>
	export default {
		globalData: {
			uViewTabBar: [
				{
					iconPath: "/static/icon/home.png",
					selectedIconPath: "/static/icon/_home.png",
					text: '首页',
					count: 0,
					isDot: true,
					pagePath: "/pages/home/index",

				},
				{
					iconPath: "/static/icon/PetCrcle.png",
					selectedIconPath: "/static/icon/_PetCrcle.png",
					text: '宠物圈',
					midButton: true,
					pagePath: "/pages/PetCrcle/index"
				},
				{
					iconPath: "/static/icon/my.png",
					selectedIconPath: "/static/icon/_my.png",
					text: '我的',
					pagePath: "/pages/my/index"
				},
			],
		},
		
		onLaunch: function() {
			

			
		},
		onShow: function() {
			
			
			
		},
		onHide: function() {
			// console.log('App Hide')
		},
		onTabItemTap(){
			
		},
	}
</script>

<style lang="scss">/*每个页面公共css */
	@import "@/UI/uView/index.scss";
	
	@import '@/src/style/base.wxss'; /* 标签初始化样式 */
	@import '@/src/style/iconfont.wxss'; /* uni_icon */
</style>
