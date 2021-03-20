<template>
	<view class="home_body">

		<view class="home">


			<!-- 搜索框 -->
			<uni-search-bar class="uni-search-bar" placeholder="请输入查询的产品" radius="15" clearButton="auto" maxlength="10"
				@confirm="search">
			</uni-search-bar>


			<!-- 轮播图 -->
			<uni-swiper-dot class="uni-swiper-dot" :info="info" :current="current" field="content" :mode="mode">
				<swiper  class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in info" :key="index">

						<view class="swiper-item">
							<image :src="item.content" mode="aspectFill" />
						</view>

					</swiper-item>
				</swiper>
			</uni-swiper-dot>




		</view>

		<!-- uView自定义导航栏 -->
		<u-tabbar :list="tabbar" :mid-button="true" active-color=#007aff :before-switch="beforeSwitch">
		</u-tabbar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: this.$vuex.state.uViewTabBar, //刷新tabbar
				searchConteng: '', //搜索框的值
				info: [{
						content: '/static/weixin/home_image/1.jpg'
					},
					{
						content: '/static/weixin/home_image/2.jpg'
					},
					{
						content: '/static/weixin/home_image/3.jpg'
					},
					{
						content: '/static/weixin/home_image/4.jpg'
					}
				],
				current: 0,
				mode: 'round',
			}

		},
		methods: {

			search(e) { //搜索框时间
				console.log(e);
			},

			change(e) {
				this.current = e.detail.current;
			},






			beforeSwitch(index) { //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
				// console.log(index)
				return true;
			}
		},
		onLoad() {

		},

	}
</script>

<style lang="scss" scoped>
	.home_body {
		.home {
			// padding: 0 15rpx;

			.uni-search-bar {}

			.uni-swiper-dot {
				// margin: 0 5px;

				.swiper-box {
					// border-radius: 10rpx;

					.swiper-item {
						margin: 0 5px;
						 
						image {
							width: 100%;
							border-radius: 20rpx;
							height: 300rpx;
							    box-shadow: darkgrey 0px 0px 30px 5px;
						}
					}
				}
			}
		}


	}
</style>
