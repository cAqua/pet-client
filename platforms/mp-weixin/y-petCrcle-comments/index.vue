<template>

	<view class="content" >
		<view class="PetCircle" >

			<!-- 用户信息 -->
			<view class="Pet_user">
				<image :src="user.img" mode=""></image>
				<view class="name">
					{{user.name}}
					<view class="user-f">
						{{user.date}}
					</view>
				</view>
			</view>
			<!-- 标题 -->
			<view class="Pet_title pD">
				<text>
					{{user.content}}
				</text>
			</view>
			<!-- 内容 -->
			<view class="Pet_img">
				<view v-for="(item,index) in user.photos" :key="index" class="P_main">
					<image mode="aspectFill" :src="item.content" @click="getImgIndex(index)"></image>
				</view>

			</view>
			<view class="Pet_icon ">

				<u-icon :label="user.zan" label-size="24" size="35" @click="show = true" name="chat"></u-icon>

			</view>
		</view>
		<!-- <u-gap height="20" bg-color="#f5f5f5"></u-gap> -->
		<!-- 评论 -->
<view class="" style="flex: 1;">
		<view class="comments">
			评论列表
		</view>
		<!-- 总体评论 -->
		<view class="c_mian pD">
			<view class="c_name" @tap="open = true">
				<!-- 用户ID -->
				<text>我是你的</text> :
				<view class="c_nr">阿斯加德哈萨克见到过会撒娇好的gas大家好噶啥大事件货款搭嘎实践活动gas大家好gas大家好噶三等奖哈撒给登记哈</view>
			</view>
			<!-- 回复某人 -->
			<view class="c_name" @tap="open = true">
				<!-- 用户ID -->
				<text>我是你的</text>回复:<text>多大肯定</text>
				<view class="c_nr">阿斯加德哈萨克见到过会撒娇好的gas大家好噶啥大事件货款搭嘎实践活动gas大家好gas大家好噶三等奖哈撒给登记哈</view>
			</view>
		</view>

	

		<!-- 评论弹出层 -->
		<view style="padding: 0 40rpx;">
			<u-popup v-model="show" mode="bottom" :mask="bg" width="100%" height="300rpx">
				<view class="inpt">
					<input type="text" placeholder="评论:" value="" />
					<button type="default">发送</button>
				</view>
			</u-popup>
			<!-- <u-button @click="show = true">打开</u-button> -->
		</view>
		<!-- 回复弹出层 -->
		<view style="padding: 0 40rpx;">
			<u-popup v-model="open" mode="bottom" :mask="bg" width="100%" height="300rpx">
				<view class="inpt">
					<input type="text" placeholder="回复某某某:" value="" />
					<button type="default">发送</button>
				</view>
			</u-popup>
			<!-- <u-button @click="show = true">打开</u-button> -->
		</view>
</view>
	<!-- 底部评论 -->
	<view class="bt_pl">
		<view class="inpt">
			<input type="text" placeholder="评论:" value="" />
			<button type="default">发送</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				open: false,
				bg: false,
				user: []
			}
		},

		methods: {
			onLoad(option) {
				console.log("已加载就触发9999");
				// console.log(option.id)
				// console.log(JSON.parse(decodeURIComponent(option.id)));
				let user = JSON.parse(decodeURIComponent(option.id));
				console.log(user)
				// this.+(this.name,[],user)
				// console.log(this.name)
				this.user = user
			},
			// open() {
			// 	console.log(this.user)
			// },
			getImgIndex(index) {
				console.log(index);

				//准备一个装图片路径的  数组imgs

				let imgs = this.user.photos.map(item => {
					//只返回图片路径
					return item.content
				})
				console.log(imgs)
				uni.previewImage({
					urls: imgs,
					current: index,

				})




				//调用预览图片的方法

			},
		}
	}
</script>
<style>
	page {
height: 100%;
	}
</style>
<style lang="scss" scoped>
.content{
	min-height: 100%;
	display: flex;
	flex-direction: column;
}
	.PetCircle {

		width: 100%;
		padding: 30rpx 10rpx;
		background-color: #fff;
		margin-bottom: 10px;
		box-shadow: 1px 1px 6px #ccc;
		flex: 1;
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
		// display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 3;
		// overflow: hidden;
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

	.comments {
		background-color: #fff;
		padding: 10rpx 30rpx;
		border-bottom: 1px solid #f5f5f5;
		border-top: 1px solid #f5f5f5;
		box-shadow: 1px 1px 6px #ccc;
		font-weight: bold;
		line-height: 50rpx;
	}

	.inpt {
		width: 100%;
		padding: 30rpx;

		display: flex;
	}

	.inpt input {
		width: 80%;
		height: 60rpx;
		background-color: #f5f5f5;
		border-radius: 20px;
		line-height: 60rpx;
		padding: 0 20rpx;
	}

	.inpt button {
		width: 20%;
		line-height: 60rpx;
		// border: none !important;
		background-color: #fff;
		font-size: 30rpx;
		color: #666;


	}

	.inpt button::after {
		border: none !important;
	}

	.c_mian {
		width: 100%;
		// padding: ;
		background-color: #fff;
		padding-bottom: 100rpx;
	}

	.c_name {
		width: 100%;
		// display: flex;
		// align-items: center;
		color: $uni-text-color-grey;
		margin-bottom: 30rpx;
	}

	.c_name text {
		color: $uni-color-primary;
		font-weight: bold;
		// font-size:$uni-font-size-lg ;
	}

	.c_nr {
		color: $uni-text-color;
		display: flex;
		margin-top: 10rpx;
		flex-wrap: wrap;
		font-size: $uni-font-size-sm;
	}

	.bt_pl {
		    flex: 1;
		    overflow-x: hidden;
				box-shadow: 1px 1px 6px #ccc;
	}
</style>
