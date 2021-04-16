<template>
  <view class="content">
    <map
      style="width: 100vw; height: 100vh;"
      :latitude="latitude"
      :longitude="longitude"
      :scale="scale"
      :markers="markers"
			show-compass	="true"
			enable-traffic	='true'
			@markertap='puon'
    ></map>
			<view>
				<u-popup v-model="show" mode="bottom" :mask="hid" height ="auto">
					<view class="box" >
						<!-- 标题 -->
						<view class="box-son">
							<view class="son-title">{{information.title}}</view>
							<text>工作日:{{information.WorkingTime}}</text>
							<view class="son-phone">电话：{{information.phone}}</view>
							<text>{{information.address}}</text>
						</view>
						<!-- 按钮 -->
						<view class="box-btn">
							<button class="pD" type="default">进店</button>
						</view>
					</view>
				</u-popup>
			</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      latitude: '',  // 中心纬度
      longitude: '', //中心经度 
      scale: 12, // 默认16
      markers: [{
				        id:1,
                latitude: 22.63858, //纬度
                longitude: 114.108434, //经度 
								title:'布吉店',//标注点名
								WorkingTime:"8:00~22:00", //工作时间
								phone:10086, //电话
								address:'广州市打卡四六级撒垃圾', //地址
               
            }, {
							  id:2,
                latitude: 22.625054,
                longitude: 114.142716,
								title:'龙岗店',//标注点名
								WorkingTime:"8:00~22:00", //工作时间
								phone:13800138000, //电话
								address:'深圳市龙岗区布吉街道奥斯卡的骄傲圣诞节哈', //地址
            }],
      // markerHeight: 30, //
			show: false ,//隐藏弹出层
			hid:false, //隐藏遮罩层
			information:[], //存放点击的店铺信息
    };
  },
	onLoad() {
		this.markers.forEach(el=>{
		    el.width = 25;
				el.height = 30;
				el.iconPath =  '/static/mp-weixin/icon/zuobiao.png';
				// el.callout = {//自定义标记点上方的气泡窗口 点击有效
				//  // 　　content:'幸福花园店A组',//文本
				//  　　color:'#ffffff',//文字颜色
				//  　　fontSize:14,//文本大小
				//  　　borderRadius:30,//边框圆角
				// 　　 bgColor:'#45b97c',//背景颜色
				//  　　display:'ALWAYS',//常显
				//     padding:10, //内边距
				// 		textAlign:'center' //文字居中
				//  }
			// console.log(el)
			
 
		})
	},
  methods: {
		 // 点击坐标显示店铺信息
		puon(e){
			// console.log(e.detail)
			  let inprot = e.detail.markerId
				if(inprot != 0){
					this.show = true;
				 // console.log(this.markers[inprot])
				 this.information = this.markers[inprot]
				  console.log(this.information)
				}
		},
    //   初次位置授权
    getAuthorize() {
      return new Promise((resolve, reject) => {
        uni.authorize({
          scope: "scope.userLocation",
          success: () => {
            resolve(); // 允许授权
          },
          fail: () => {
            reject(); // 拒绝授权
          },
        });
      });
    },
    // 确认授权后，获取用户位置
    getLocationInfo() {
      const that = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          // 暂时
					// console.log(res)
          that.longitude = res.longitude; //118.787575;
          that.latitude = res.latitude; //32.05024;
					that.markers.unshift({
						id:0,
						latitude: res.latitude,
						longitude: res.longitude,
						width:25,
						height:30,
						title:'您在这',
						iconPath: '/static/mp-weixin/icon/zuobiao.png',
						  callout:{//自定义标记点上方的气泡窗口 点击有效  
						   　　content:'您的当前位置',//文本
						   　　color:'#ffffff',//文字颜色
						   　　fontSize:14,//文本大小
						   　　borderRadius:30,//边框圆角
						  　　 bgColor:'#45b97c',//背景颜色
						   　　display:'ALWAYS',//常显
							    padding:10, //内边距
									textAlign:'center' //文字居中
						   },
					});
          that.getList();
        },
      });
    },
    // 拒绝授权后，弹框提示是否手动打开位置授权
    openConfirm() {
      return new Promise((resolve, reject) => {
        uni.showModal({
          title: "请求授权当前位置",
          content: "我们需要获取地理位置信息，为您推荐附近的美食",
          success: (res) => {
            if (res.confirm) {
              uni.openSetting().then((res) => {
                if (res[1].authSetting["scope.userLocation"] === true) {
                  resolve(); // 打开地图权限设置
                } else {
                  reject();
                }
              });
            } else if (res.cancel) {
              reject();
            }
          },
        });
      });
    },
    // 彻底拒绝位置获取
    rejectGetLocation() {
      uni.showToast({
        title: "你拒绝了授权，无法获得周边信息",
        icon: "none",
        duration: 2000,
      });
    },
    getList() {
      console.log("获取周围美食");
    },
  },
  onReady() {
    //   wx请求获取位置权限
    this.getAuthorize()
      .then(() => {
        //   同意后获取
        this.getLocationInfo();
      })
      .catch(() => {
        //   不同意给出弹框，再次确认
        this.openConfirm()
          .then(() => {
            this.getLocationInfo();
          })
          .catch(() => {
            this.rejectGetLocation();
          });
      });
  },
};
</script>

<style lang="scss" scoped>
.box{
	width: 100%;
	height: auto;
	display: flex;
	padding: 30rpx;
}
.box-son{
	width: 60%;
	height: auto;
}
.son-title{
	font-weight: bold;
	font-size: $uni-font-size-lg;
	line-height: 50rpx;
}
.box-son text{
	font-size: $uni-font-size-sm;
	color: $uni-text-color-dark;
	line-height: 40rpx;
}
.son-phone{
	font-size: $uni-font-size-sm;
	color: $uni-text-color-dark;
	line-height: 40rpx;
}
// 按钮
.box-btn{
	width: 40%;
	display: flex;
	justify-content: center;
	align-items: center;
	}
	.box-btn button{
		width: 90%;
		background-color: $uni-color-primary;
		color: #fff;
	}
</style>
