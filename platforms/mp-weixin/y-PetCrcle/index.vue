<template>
	<view class="content">
		 宠物
		 
		<u-tabbar :list="tabbar" :mid-button="true" :active-color=$tcolor :before-switch="beforeSwitch" ></u-tabbar>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				tabbar:this.$store.state.home.uViewTabBar,  //刷新tabbar
				$tcolor:this.$store.state.$tcolor //
			}
		},
		methods:{
			
			beforeSwitch(index){  //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
				// console.log(index)
				return true;
			}
		},
		
		onLoad() {
			

		
		}
	}
</script>

<style>

</style>
