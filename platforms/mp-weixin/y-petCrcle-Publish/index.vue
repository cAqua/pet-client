<template>
	<view class="content">
		<view class="load">	
		<button @click="submit">发表</button>
		</view>
		<textarea class="tar" v-model="main" placeholder="记录每一刻~" />
		<u-upload   ref="uUpload" :before-upload="beforeUpload" :action="action" :auto-upload="false" max-count="9" ></u-upload>
	</view>
</template>

<script>
export default {
		data() {
			return {
				// 服务器地址
				// action: 'http://192.168.1.181:812/UploadingTools/upload_ajax.ashx?action=uniappUViewBatch',
				action: 'http://8.136.181.16/api/dunamic',
				// load:true, //隐藏上传进度条
				main:'' ,//发表的文章
				filesArr: []
			
			}
		},
		methods:{
				beforeUpload(index, list) {
											// 只上传偶数索引的文件
											// if(index % 2 == 0) return true;
											// else return false;
											
											console.log("index:即当前上传文件在上传列表中的索引");
											console.log(index);
											console.log("lists:当前所有的文件列表");
											console.log(list);
										},
				 			submit() {
								this.$refs.uUpload.upload();
				 				let files = [];
				 				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				 				files = this.$refs.uUpload.lists.filter(val => {
				 					return val.progress == 100;
				 				})
				 				// 如果您不需要进行太多的处理，直接如下即可
				 				// files = this.$refs.uUpload.lists;
				 				console.log(files)
								// clear()
				 			}
				
		}
	}
</script>
<style>
/* 	page{
		background-color: #f5f5f5;
	} */
</style>
<style lang="scss" scoped>
	.load{
		display: flex;
		justify-content: flex-end;
		width: 100%;
		padding: 20rpx;
		// background-color: #FFFFFF;
	}
	.load button{
		background-color: $uni-color-success;
		margin: 0 30rpx 0 0;
		font-size: $uni-font-size-sm;
		color: #fff;
		// padding: 0;
		width: 100rpx;
		height: 60rpx;
	}
	.tar{
		width: 90%;
		padding: 10rpx 0 20rpx 30rpx;
		font-weight: 500;
		background-color: #f5f5f5;
	}

</style>
