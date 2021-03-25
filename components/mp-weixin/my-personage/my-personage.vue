<template>
  <view class="MyBody">
    <view class="personalInfo">
      <view class="info">
        <view class="portrait">
          <image :src="userPortrait"></image>
        </view>

        <view class="name">
          <view>
            <button
              hover-class="none"
              open-type="getUserInfo"
							@getuserinfo='getuserinfo'
							@click="fun()"
            >
              {{ userName }}
            </button>
          </view>

          <view class="icon">
            <uni-icons type="arrowright" size="18" color="#ffffff"></uni-icons>
          </view>
        </view>

        <view> </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabbar: this.$vuex.state.uViewTabBar, //刷新tabbar
      $tcolor: this.$vuex.state.$tcolor, //全局主题颜色
      userPortrait: "../../../static/mp-weixin/icon/default-portrait.png", //头像
      userName: "Hi,您尚未登录",
      UserInfo:{}
    };
  },
  created() {
		const userinfo = uni.getStorageSync('UserInfo')
		this.userName = userinfo.nickName;
		this.userPortrait = userinfo.avatarUrl;
   
  },
  methods: {


    // getuserinfo(e) {
    //   console.log(e);
    //   let infoResValue = new Promise((resolve, reject) => {
    //     uni.login({
    //       provider: "weixin", //服务商
    //       timeout: 5000,
    //       lang: "zh_CN",
    //       success: (loginRes) => {
    //         console.log("loginRes: ", loginRes);
    //         resolve(loginRes.code);
    //       },
    //       fail: (error) => console.log(error),
    //       // complete: (loginRes) => console.log(loginRes.errMsg),
    //     });
    //   });

    //   let UserInfo = infoResValue.then((loginRes) => {
    //     return new Promise((resolve, reject) => {
    //       uni.getUserInfo({
    //         provider: "weixin",
    //         lang: "zh_CN",
    //         success: (infoRes) => {
    //           infoRes.userInfo.code = loginRes;
    //           resolve(infoRes.userInfo);
    //         },
    //         fail: (error) => console.error(error),
    //         // complete: (i) => console.warn(i),
    //       });
    //     });
    //   });

    //   UserInfo.then((result) => {
    //     console.log(result);
    //     // this.$vuex.state.UserInfo = result;
    //   });
    // },

    beforeSwitch(index) {
      //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
      // console.log(index)
      // return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.MyBody {
  //个人信息
  .personalInfo {
    display: flex;
    align-items: center;
    width: 750rpx;
    height: 240rpx;
    padding: 20rpx;
    background: linear-gradient(to top right, #bbdefa, $tcolor);

    .info {
      width: 100%;
      display: flex;

      .portrait {
        flex: 2;
        font-size: 38rpx;

        image {
          width: 150rpx;
          height: 150rpx;
        }
      }

      .name {
        flex: 8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20rpx;
        font-size: 38rpx;
        color: #ffffff;

        button {
          padding: 0;
          margin: 0;
        }
        button::after {
          border: none;
        }

        // 点击时样式
        .button-hover {
          color: rgba(0, 0, 0, 0.6);
          background-color: #fff;
        }
      }
    }
  }
}
</style>
