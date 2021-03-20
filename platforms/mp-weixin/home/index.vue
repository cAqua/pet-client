<template>
	<view class="home_body">

		<view class="home">


			<!-- 搜索框 -->
			<uni-search-bar class="uni-search-bar" placeholder="请输入查询的产品" radius="15" clearButton="auto" maxlength="10"
				@confirm="search">
			</uni-search-bar>


			<!-- 轮播图 -->
			<uni-swiper-dot class="uni-swiper-dot" :current="current" mode="default" field="nav" :info="info">
				<swiper class="swiper-box" @change="change" autoplay="true" circular="true" next-margin="5px"
					previous-margin="5px">
					<swiper-item v-for="(item ,index) in info" :key="index">

						<view class="swiper-item">
							<image :src="item.content" mode="aspectFill" />
						</view>

					</swiper-item>
				</swiper>
			</uni-swiper-dot>

			<view class="Merchant">

				<!-- 附近商家标题 -->
				<view class="Merchant_title">
					<view class="Merchant_title_main">
						<view class="nearby">NEARBY</view>
						<view>附近商家</view>
					</view>
				</view>

				<!--  主体 -->
				


			</view>


		</view>

		<!-- uView自定义导航栏 -->
		<u-tabbar :list="tabbar" :mid-button="true" :active-color="$tcolor" :before-switch="beforeSwitch">
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
						content: '/static/mp-weixin/home_image/1.jpg'
					},
					{
						content: '/static/mp-weixin/home_image/2.jpg'
					},
					{
						content: '/static/mp-weixin/home_image/3.jpg'
					},
					{
						content: '/static/mp-weixin/home_image/4.jpg'
					}
				],
				current: 0,
				mode: 'round',
				$tcolor: this.$vuex.state.$tcolor
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


			//轮播图
			.uni-swiper-dot {
				.swiper-box {
					.swiper-item {
						image {
							width: 100%;
							border-radius: 20rpx;
							height: 300rpx;
							box-shadow: darkgrey 0px 0px 30px 5px;
						}
					}
				}
			}

			//附近商家标题
			.Merchant_title {
				display: flex;
				align-items: center;
				margin: 10px;
				width: 95%;
				height: 52px;
				padding-left: 2%;
				background: linear-gradient(to top right, #bbdefa, $tcolor);
				border-radius: $uni-border-radius-lg;

				.Merchant_title_main {
					width: 100%;
					border-left: 4rpx solid #FFFFFF;
					display: flex;
					flex-direction: column;
					font-size: $uni-font-size-lg;
					padding-left: 2%;
					color: #FFFFFF;
					font-weight: 700;

					.nearby {
						font-weight: normal;
						font-size: $uni-font-size-sm;
					}
				}
			}
		}


	}
</style>
