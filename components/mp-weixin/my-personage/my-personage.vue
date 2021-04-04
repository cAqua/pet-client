<template>
  <view class="MyBody">
    <view class="personalInfo">
      <view class="info">
        <view class="portrait">
          <image :src="userInfo.img"></image>
          <!-- 图片路径在vuex.home -->
        </view>

        <view class="name">
          <view>
            <button hover-class="none" @click="getuserinfo()">
              {{ userInfo.usernmae }}
              <!-- 名称在vuex.home -->
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
// import { getUserInfoApi } from "@/store/mp-weixin/Weapp-User-Api.js";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      tabbar: getApp().globalData.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.home.$tcolor, //全局主题颜色
      userInfo: {
        usernmae: "Hi,您尚未登录",
        img: "/static/mp-weixin/icon/default-portrait.png",
      },
    };
  },
  props: {},
  computed: {
    ...mapState(
      "home", //用户数据
      [ "getUserInfoFlag"]
    ),
  },
  created() {

    
    //页面进入判断本地有没有缓存
    if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) {

      let Info = uni.getStorageSync("UserInfo");
      this.userInfo.usernmae = Info.usernmae; //name
      this.userInfo.img = Info.img; //头像
      this.getUserInfoFlagFun(); //防止多次点击
      console.warn("个人中心:其他页面登录了所以这里不用获取缓存");
    }
  },
  methods: {
    ...mapActions("home", ["userLogin", "userlogout"]), //登录退出
    ...mapMutations("home", {
      //防止多次点击
      getUserInfoFlagFun: "getUserInfoFlag",
    }),

    getuserinfo(e) {

      if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) return console.warn("本地已经有数据防止多次点击");

      this.userLogin() //调用静默登录
        .then((res) => {
          //登录成功回调

          let UserInfo = uni.getStorageSync("UserInfo");
          this.userInfo.usernmae = UserInfo.usernmae;
          this.userInfo.img = UserInfo.img;
          return uni.showToast({ title: "登录成功" });
        })
        .catch((err) => {
          //拒绝授权
          uni.showToast({
            title: "登录失败,请授权登录后查看更多信息",
            icon: "none",
          });
        });
    },

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

        button {
          color: #ffffff;
          background: none;
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
