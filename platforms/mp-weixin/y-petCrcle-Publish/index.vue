<template>
	<view class="content">
		<view class="load">
			<button @click="submit">发表</button>
		</view>
		<textarea class="tar" v-model="main" placeholder="记录每一刻~" />
		<u-upload   ref="uUpload" :form-data="formData"   :before-upload="beforeUpload" :action="action" :auto-upload="false" max-count="9" ></u-upload>
	</view>
</template>

<script>
export default {
		data() {
			return {
				// 服务器地址
				action: 'http://8.136.181.16/api/dunamic',
				// load:true, //隐藏上传进度条
				main:'' ,//发表的文章
				// filesArr: [],
				formData:{
					DunamicId:'123',
					id:'12312',
					DuamincContent:''
				}
			
			}
		},
		onLoad() {
			
		},
		methods:{ 

				 			submit() {
								let _this = this
								// this.$refs.uUpload.upload();
							uni.getStorage({
							    key: 'UserInfo',
							    success: function (res) {
							        // console.log(res.data.id);
										_this.formData.id = res.data.id
							    }
							});
							_this.formData.DuamincContent = _this.main
							setTimeout(()=>{
							if( _this.formData.DuamincContent != '' && _this.formData.id != '' &&_this.formData.DunamicId != ''){
								this.$refs.uUpload.upload();
								
							}else{
									console.log(_this.formData)
							}
								
							},1000)

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
