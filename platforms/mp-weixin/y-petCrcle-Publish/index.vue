<template>
	<view class="content">
		<view class="load">
			<button @click="submit">发表</button>
		</view>
		<textarea class="tar" v-model="from.DuamincContent" placeholder="记录每一刻~" />
		<u-upload  ref="uUpload" :form-data="from"  :action="action" @on-error="onErr" @on-uploaded="onuploaded"  :auto-upload="false" @on-progress="onPro" @on-success="onSuccess"></u-upload>
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
					fliename:''
				},
					filesArr: []
			}
		},
		onLoad() {

		},
		// 上传中

		methods: {
			submit() {
							let file = []
							this.$refs.uUpload.lists.forEach(el =>{
								file.push(el.url)
							})
					this.filesArr = file
								console.log(this.filesArr)
							if( this.from.DuamincContent != '' && this.filesArr == ''){
									dunamic({
										"id":this.from.id,
										"DuamincContent":this.from.DuamincContent,
										"fliename":this.from.fliename
										}).then(res=>{
										console.log(res)
									}),
									uni.navigateBack({
									    delta: 1
									});
               
								}else if(this.from.DuamincContent != ''){
									this.$refs.uUpload.upload();
							
								}else{
									uni.showToast({
											    title: '请填写内容',
													icon: 'none' ,
													mask:true,
													duration:1000
											});
								}
			},
			onuploaded(lists, name){  // 全部图片上传完后触发
				dunamic({
					"id":this.from.id,
					"DuamincContent":this.from.DuamincContent,
					"fliename":this.from.fliename
					}).then(res=>{
					console.log(res)
				}),
				uni.navigateBack({
				    delta: 1
				});
			},
			onPro(){
			uni.showLoading({
			    title: ' 发表中...',
					mask:true,
					duration:100000
			});			
					console.log('上传中')
				},
				// 发表成功跳转页面
				onSuccess(index,list){
			
				},
				onErr(){
				uni.showToast({
						    title: '上传失败',
								icon: 'none' ,
								mask:true,
								duration:1000
						});
					},
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
		padding: 0;
		height: 60rpx;
	}

	.tar {
		width: 90%;
		padding: 10rpx 0 20rpx 30rpx;
		font-weight: 500;
		background-color: #f5f5f5;
	}
</style>
