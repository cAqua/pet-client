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
            <button
              hover-class="none"
              open-type="getUserInfo"
              @getuserinfo="getuserinfo"
            >
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
import { getUserInfoApi } from "@/store/mp-weixin/Weapp-User-Api.js";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      tabbar: this.$store.state.home.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.home.$tcolor, //全局主题颜色
    };
  },
  props: {
    info: {
      type: Object,
    },
  },
  computed: {
    ...mapState(
      "home", //用户数据
      ["userInfo",'getUserInfoFlag']
    ),
  },
  created() {
   
    if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) { //页面进入判断本地有没有缓存

      this.userInfo.usernmae = uni.getStorageSync("UserInfo").usernmae;
      this.userInfo.img = uni.getStorageSync("UserInfo").img;
      this.getUserInfoFlagFun();
      console.warn("该登录类型是其他页面登录了所以这里不用获取缓存");
    }
  },
  methods: {
    ...mapMutations("home", ["userLogin", "userlogout"]), //登录退出
    ...mapMutations("home", { //防止多次点击
      getUserInfoFlagFun: "getUserInfoFlag",
    }),

    getuserinfo(e) {  

      if (this.getUserInfoFlag == false) return console.warn("防止多次点击");

      if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) {//本地存在用户数据

      this.userInfo.usernmae = uni.getStorageSync("UserInfo").usernmae;
      this.userInfo.img = uni.getStorageSync("UserInfo").img;
        this.getUserInfoFlagFun();
        console.warn("该登录类型是,用户在首页没有确定授权在本页面需要登录,点击按钮触发");
        return uni.showToast({ title: "登录成功", icon: "success" });
      }

      // 能进入这里的说明授权点了确定 而且是第一次进入并且本地没有数据
      this.thatUserInfo = this.userLogin(e.detail.userInfo);
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
