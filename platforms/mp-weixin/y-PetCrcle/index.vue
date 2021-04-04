<template>
	<view class="content">

		<view class="PetCircle " v-for="(cont,ind) in user" :key="ind">

			<!-- 用户信息 -->
			<view class="Pet_user">
				<image :src="cont.img" mode="aspectFill"></image>
				<view class="name">
					{{cont.name}}
					<view class="user-f">
						{{cont.date}}
					</view>
				</view>
			</view>
			<!-- 标题 -->
			<view class="Pet_title pD">
				<text>
					{{cont.content}}
				</text>
			</view>
			<!-- 内容 -->
			<view class="Pet_img">
				<view v-for="(item,index) in cont.photos" :key="index" class="P_main">
					<image mode="aspectFill" :src="item.content" @click="getImgIndex(index,ind)"></image>
				</view>

			</view>
			<view class="Pet_icon ">

				<u-icon :label="cont.zan" label-size="24" size="35" @click="To(ind)" name="chat"></u-icon>

			</view>
		</view>
		<!-- 发表按钮 -->
		<view class="Publish" @tap="go">
			<u-icon name="plus"  color="#666" size="36"></u-icon>
		</view>

		<u-divider>到底了</u-divider>
		<u-tabbar :list="tabbar" :mid-button="true" :active-color=$tcolor :before-switch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: getApp().globalData.uViewTabBar, //刷新tabbar
				$tcolor: this.$store.state.home.$tcolor,
				user: [{
						name: '我是你爹',
						img: '/static/mp-weixin/home_image/1.jpg',
						content: '我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子',
						date: '2021-2-15',
						zan: '120',
						photos: [{
								content: 'https://xyylcdn.weein.cn/group1/M00/04/19/rBUUDl78bAyAUgpEAAMr1h87H1A753.jpg'
							},
							{
								content: '/static/mp-weixin/home_image/2.jpg'
							},
							{
								content: '/static/mp-weixin/home_image/3.jpg'
							},
							{
								content: '/static/mp-weixin/home_image/4.jpg'
							},


							{
								content: 'https://gd3.alicdn.com/imgextra/i3/1828499121/O1CN01AjYIG72HFTBZsrJ5v_!!1828499121.jpg_400x400.jpg'
							}

						], // 存放从后台获取的数据 

					},
					{
						name: '我是你爹',
						img: '/static/mp-weixin/home_image/1.jpg',
						content: '我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子',
						date: '2021-2-15',
						zan: '120',
						photos: [{
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
							},
							{
								content: '/static/mp-weixin/home_image/4.jpg'
							},

							{
								content: 'https://gd3.alicdn.com/imgextra/i3/1828499121/O1CN01AjYIG72HFTBZsrJ5v_!!1828499121.jpg_400x400.jpg'
							}

						], // 存放从后台获取的数据 
					},
					{
						name: '我是你爹',
						img: '/static/mp-weixin/home_image/1.jpg',
						content: '我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子我是一条哈巴狗,你别走!生下来,我来养你跟他的孩子',
						date: '2021-2-15',
						zan: '120',
						photos: [{
								content: 'https://xyylcdn.weein.cn/group1/M00/04/19/rBUUDl78bAyAUgpEAAMr1h87H1A753.jpg'
							},
							{
								content: '/static/mp-weixin/home_image/2.jpg'
							},
							{
								content: '/static/mp-weixin/home_image/3.jpg'
							},
							{
								content: '/static/mp-weixin/home_image/4.jpg'
							},

							{
								content: 'https://gd3.alicdn.com/imgextra/i3/1828499121/O1CN01AjYIG72HFTBZsrJ5v_!!1828499121.jpg_400x400.jpg'
							}

						], // 存放从后台获取的数据 
					},
				],


			}
		},
		methods: {
			onLoad() {
				setTimeout(function() {
					console.log('start pulldown');
				}, 1000);
				uni.startPullDownRefresh();

			},
			onPullDownRefresh() {
				// console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			onShow() {

			},
			beforeSwitch(index) { //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
				// console.log(index)
				return true;
			},
			getImgIndex(index, ind) {
				console.log(index, ind);

				//准备一个装图片路径的  数组imgs

				let imgs = this.user[ind].photos.map(item => {
					//只返回图片路径
					return item.content
				})
				console.log(imgs)
				uni.previewImage({
					urls: imgs,
					current: index,
					// longPressActions: { //长按保存图片到相册
					// 	itemList: ['保存图片'],
					// 	success: (data) => {
					// 		console.log(data);
					// 		uni.saveImageToPhotosAlbum({ //保存图片到相册
					// 			filePath: payUrl,
					// 			success: function() {
					// 				uni.showToast({
					// 					icon: 'success',
					// 					title: '保存成功'
					// 				})
					// 			},
					// 			fail: (err) => {
					// 				uni.showToast({
					// 					icon: 'none',
					// 					title: '保存失败，请重新尝试'
					// 				})
					// 			}
					// 		});
					// 	},
					// 	fail: (err) => {
					// 		console.log(err.errMsg);
					// 	}
					// }
				})




				//调用预览图片的方法

			},
			go(){
				uni.navigateTo({
					url: '../y-petCrcle-Publish/index'
				})
			},
			To(i) {
				let user = encodeURIComponent(JSON.stringify(this.user[i]));

				uni.navigateTo({
					url: '../y-petCrcle-comments/index?id=' + user
					// url: '../y-petCrcle-Publish?id=' + user
					// url: '../comments/comments?id=1'
				})
			},


		}


	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.PetCircle {

		width: 100%;
		padding: 30rpx 10rpx;
		background-color: #fff;
		margin-bottom: 10px;
		box-shadow: 1px 1px 6px #ccc;

	}

	.Pet_user {
		width: 100%;
		display: flex;
		align-items: center;

		padding: 0 20rpx;
	}

	.Pet_user image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 30rpx;
	}

	.name {
		font-size: $uni-font-size-base;
		font-weight: bolder;
	}

	.user-f {
		font-size: $uni-font-size-sm;
		font-weight: normal;
		margin-top: 10rpx;
		color: $uni-text-color-grey;
	}

	.Pet_title {
		width: 100%;
	}

	.Pet_title text {
		color: $uni-color-paragraph;
		font-size: $uni-font-size-paragraph;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.Pet_img {
		width: 100%;
		display: flex;
		// justify-content: center;
		flex-wrap: wrap;
		height: auto;
	}

	.P_main {
		width: 33%;
		height: auto;
		padding: 5rpx;
	}

	.P_main image {
		width: 100%;
		height: 250rpx;

	}

	.Pet_icon {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		// align-items: center;
		// text-align: right;
		padding: 15px 20px 0;
	}
	.Publish{
		width: 80rpx;
		height: 80rpx;
		background-color: #ccc;
		border-radius: 100%;
		position: fixed;
		right: 10rpx;
		bottom: 20%;
		line-height: 80rpx;
		text-align: center;
		}
</style>
