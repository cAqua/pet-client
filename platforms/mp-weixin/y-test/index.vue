
<template>
  <view class="auto-login h100 flex a-center j-center">
    <view class="content flex flex-column a-center j-center">
      <view class="title">{{status==='userInfo'?'授权登陆':'授权地址位置'}}</view>
      <button
        open-type="getUserInfo"
        @getuserinfo="bindGetUserInfo"
        class="btn"
        :loading="loading"
        :disabled="loading"
        v-if="status==='userInfo'"
      >
        微信一键登录
      </button>
      <button
        @click="handler"
        class="btn"
        v-if="status==='userLocation'"
      >
        授权地址位置
      </button>
    </view>
  </view>
</template>
 
<script>
	export default{
		props:{
			status:{
				type:String,
				default:"userInfo"
			}
		},
		data(){
			return{
				loading:false
			}
		},
		methods:{
			bindGetUserInfo(e){
				var _this=this;		
				if (e.detail.userInfo){	
					this.loading=true
					wx.getSetting({
					  success(res1) {    	   
						console.log("res1",res1)
						if (!res1.authSetting['scope.userInfo']) {//未授权getUserInfo            	
						  wx.authorize({
							scope: 'scope.getUserInfo',
							success(res2) {	  
								_this.getTokenValue({
									success:()=>{
										console.log("授权成功跳转页面")
									},
									complete:()=>{
										_this.loading=false	
									}
								})
							},
							fail(err){  
								_this.uniShowToast({
									title: "您拒绝了授权，无法获取小程序信息，请前往授权",
									icon: "none"
								})
								_this.loading=false	
							}
						  })
						}else{//已授权	
							_this.getTokenValue({
								success:()=>{
									console.log("授权成功跳转页面")
								},
								complete:()=>{
									_this.loading=false	
								}
							})
						}
					  }
					})												
				} else {
					_this.uniShowToast({
						title: "用户拒绝了授权",
						icon: "none"
					})
				}
			},		
uniShowToast(options) {
		let {
			title,
			icon,
			mask,
			duration,
			image
		} = options
		uni.showToast({
			title: title,
			icon: icon ? icon : "success",
			image: image ? image : "",
			mask: mask ? mask : false,
			duration: duration ? duration : 1500,
			complete: () => {
				setInterval(() => {
					uni.hideToast();
				}, 30000)
			}
		});
	},
        getTokenValue(options) {
		let {
			success,
			fail,
			complete
		} = options
		var _this = this;
		uni.login({ //获取微信用户的code值
			provider: 'weixin',
			success(r) {
				if (r.code) {
					uni.getUserInfo({ //获取微信用户的encryptedData，iv值
						provider: 'weixin',
						success(res) {							
							_this.uniRequest({
								url: "login",
								method: "POST",
								params: {	
									code: r.code,
									encryptedData: res.encryptedData,
									iv: res.iv
								},
								success: (res1) => {								
									if (res1.code === 1) {
										_this.uniSetStorage('userInfo',res.userInfo)
										_this.uniSetStorage('token',res1.data.token)
										_this.uniSetStorage('userId', res1.data.user_id)
										success ? success() : false
									} else {
										_this.uniShowToast({
											title: "获取用户token失败",
											icon: "none"
										})
									}
									complete ? complete() : false
								},
								fail: (err) => {
									_this.uniShowToast({
										title: "获取用户token失败",
										icon: "none"
									})
									complete ? complete() : false
								}
							})
						},
						fail:(err)=>{
							_this.uniShowToast({
								title: "获取用户信息失败",
								icon: "none"
							})
							complete ? complete() : false
						}
					});
				} else {
					_this.uniShowToast({
						title: "获取微信登录login的code失败！",
						icon: "none"
					})
					complete ? complete() : false
				}
			}
		});
	},
	
			handler(){
				let _this=this
				uni.openSetting({
				  success(res) {
				    console.log(res.authSetting)
					if(res.authSetting['scope.userLocation']){
						_this.$emit("loginOk",true)
					}
				  }
				})
			},

			postion(){

function authorizedPositioningPromise() {
	return new Promise((resolve, reject) => {
		uni.getSystemInfo({
			success({
				locationEnabled,
				locationAuthorized
			}) {
				// locationEnabled 判断手机定位服务是否开启
				// locationAuthorized 判断定位服务是否允许微信授权
				if (!locationEnabled && !locationAuthorized) {
					// GPS未开启 与 GPS未给微信授权定位服务
					reject("GPSnotOpen");
				} else if (locationEnabled && !locationAuthorized) {
					// GPS已开启 与 GPS未给微信授权定位服务
					reject("GPSauthorization");
				} else if (locationEnabled && locationAuthorized) {
					/* 
						GPS已开启 与 GPS已给微信授权定位服务
						判断微信小程序位置信息是否开启
					*/
					uni.authorize({
						scope: "scope.userLocation",
						success() {
							// 微信小程序位置信息已开启
							uni.getLocation({
								success({
									latitude,
									longitude
								}) {
									// latitude; 纬度
									// longitude; 经度
									resolve({
										latitude,
										longitude
									});
								}
							});
						},
						fail() {
							// 微信小程序位置信息未开启
							reject("weixinPositionNotOpen");
						}
					})
				}
			},
			fail(err) {
				let reg = /request:fail/;
				if (reg.test(err.errMsg)) {
					// 无网络
					reject("noNetWork");
				} else {
					// 请求超时'
					reject("requestTimeOut");
				}
			}
		})
	});
}
				
			},

			
		}
	}
</script>
 
<style scoped lang="less">
.auto-login {
  .content {
    width: 80%;
    height: 80%;
    background: white;
    border-radius: 8rpx;
    .title {
      font-size: 34rpx;
      margin-bottom: 80rpx;
    }
    .btn {
      padding: 16rpx 40rpx;
      background: #75f4ba;
      border-radius: 8rpx;
      font-size: 30rpx;
    }
  }
}
</style>
