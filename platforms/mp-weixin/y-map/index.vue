<template>
  <view>
    <map
      style="width: 100vw; height: 100vh;"
      :latitude="latitude"
      :longitude="longitude"
      :scale="scale"
      :markers="markers"
			show-compass	="true"
			enable-traffic	='true'
    ></map>
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
                latitude: 22.63858, //纬度
                longitude: 114.108434, //经度 
								title:'你在哪了',//标注点名
               
            }, {
                latitude: 22.625054,
                longitude: 114.142716,
								title:'我在这',//标注点名
               
            }],
      markerHeight: 30,
    };
  },
	onLoad() {
		this.markers.forEach(el=>{
		    el.width = 25;
				el.height = 30;
				// el.title = '我在这',
				el.iconPath =  '/static/mp-weixin/icon/zuobiao.png',
				el.callout = {//自定义标记点上方的气泡窗口 点击有效
				 　　content:'幸福花园店A组',//文本
				 　　color:'#ffffff',//文字颜色
				 　　fontSize:14,//文本大小
				 　　borderRadius:30,//边框圆角
				　　 bgColor:'#45b97c',//背景颜色
				 　　display:'ALWAYS',//常显
				    padding:10, //内边距
						textAlign:'center' //文字居中
				 }
			// console.log(el)
			
 
		})
	},
  methods: {
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

<style>

</style>
