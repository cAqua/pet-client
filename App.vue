<script>
export default {
  globalData: {
    uViewTabBar: [
      //定义tabbar
      {
        iconPath: "/static/mp-weixin/icon/home.png",
        selectedIconPath: "/static/mp-weixin/icon/_home.png",
        text: "首页",
        count: 0,
        isDot: true,
        pagePath: "/platforms/mp-weixin/y-home/index",
      },
      {
        iconPath: "/static/mp-weixin/icon/PetCrcle.png",
        selectedIconPath: "/static/mp-weixin/icon/_PetCrcle.png",
        text: "宠物圈",
        midButton: true,
        pagePath: "/platforms/mp-weixin/y-PetCrcle/index",
      },
      {
        iconPath: "/static/mp-weixin/icon/my.png",
        selectedIconPath: "/static/mp-weixin/icon/_my.png",
        text: "我的",
        pagePath: "/platforms/mp-weixin/y-my/index",
      },
    ],
    sViewTabBar: [
      //定义tabbar
        {
          iconPath: "/static/mp-weixin/icon/chatList.png",
          selectedIconPath: "/static/mp-weixin/icon/_chatList.png",
          text: "聊天列表",
          pagePath: "/platforms/mp-weixin/s-chatList/index",
          count:2,
        },

      {
        iconPath: "/static/mp-weixin/icon/home.png",
        selectedIconPath: "/static/mp-weixin/icon/_home.png",
        text: "我的",
        pagePath: "/platforms/mp-weixin/s-my/index",
      },
    ],
    getStorageUserInfo:function(){
    let { id, UserType } = uni.getStorageSync('UserInfo');
    return {id,UserType}
    },
    
  }, //全局属性 通过 getApp().globalData.*** 读取变量


  		// async getStorageUserInfo (state) { //获取用户 id 与类型
			// return new Promise(resolve => {
			// 	
			// 	resolve({ id, UserType })
			// })

  onLaunch: function () {
    //全局出发一次
  },
  onShow: function () {},
  onHide: function () {
    // console.log('App Hide')
  },
};
</script>

<style lang="scss" >
/*每个页面公共css */

/* #ifdef MP-WEIXIN */
@import "@/UI/uView/index.scss";
/* 标签初始化样式 */
/* #endif */
@import "@/src/mp-weixin/style/iconfont.wxss";
/* uni_icon */
</style>
