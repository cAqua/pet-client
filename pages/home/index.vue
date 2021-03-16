<template>
	<view class="content">
		

		<u-tabbar 
		:list="tabbar" 
		:mid-button="true" 
		active-color=#007aff  
		:before-switch="beforeSwitch" ></u-tabbar>		
	</view>
</template>

<script>
	export default { 
		components:{},
		data() {
			return {
				tabbar:this.$vuex.state.uViewTabBar  //刷新tabbar
			}
		},
		methods:{
			
			beforeSwitch(index){  //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
				// console.log(index)
				return true;
			}
		},
		onLoad() {
			

			
			
		},
		onShow(){
		},
	}
</script>

<style lang="scss" scoped>
</style>
