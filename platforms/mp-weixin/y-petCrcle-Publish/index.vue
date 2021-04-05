<template>
	<view class="content">
		<view class="load">
			<button @click="submit">发表</button>
		</view>
		<textarea class="tar" v-model="from.DuamincContent" placeholder="记录每一刻~" />
		<u-upload  ref="uUpload" :form-data="from"  :action="action" @on-uploaded="onuploaded"  :auto-upload="false"></u-upload>
	</view>
</template>

<script>
	import {
		dunamic
	} from "@/store/mp-weixin/Weapp-User-Api.js";
	export default {
		data() {
			return {
				// 服务器地址
				action: 'http://8.136.181.16/api/fliename',
				// load:true, //隐藏上传进度条
				from:{
					id:'',
					DuamincContent:'',
					fliename:'',
				}
			}
		},
		onLoad() {

		},
		methods: {
			submit() {
               this.$refs.uUpload.upload();
			},
			onuploaded(lists, name){  // 全部图片上传完后触发
				dunamic({
					"id":this.from.id,
					"DuamincContent":this.from.DuamincContent,
					"fliename":this.from.fliename
					}).then(res=>{
					console.log(res)
				})
			}

		},
		mounted() {
			let _this = this;
			let fliename = `${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;  //生成文件夹名字
			_this.from.fliename  = fliename;
			uni.getStorage({
			    key: 'UserInfo',
			    success: function (res) {
						_this.from.id = res.data.id
			    }
			});
		}
	}
</script>
<style>
	/* 	page{
		background-color: #f5f5f5;
	} */
</style>
<style lang="scss" scoped>
	.load {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		padding: 20rpx;
		// background-color: #FFFFFF;
	}

	.load button {
		background-color: $uni-color-success;
		margin: 0 30rpx 0 0;
		font-size: $uni-font-size-sm;
		color: #fff;
		// padding: 0;
		width: 100rpx;
		height: 60rpx;
	}

	.tar {
		width: 90%;
		padding: 10rpx 0 20rpx 30rpx;
		font-weight: 500;
		background-color: #f5f5f5;
	}
</style>
