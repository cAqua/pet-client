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
            <button hover-class="none" @tap="$u.throttle(getuserinfo,1500)"> <!-- 节流 -->
              {{ userInfo.username }}
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


    

    <!-- <view style="width:100%;height:30px;text-align:center;background-color:aqua"
     @click="thisLogout()">注销</view> -->
    <!-- 自定义rabbar栏 -->
    <u-tabbar
      :list="tabbar"
      :mid-button="true"
      :active-color="$tcolor"
      inactive-color='#bfbfbf'
      :before-switch="beforeSwitch"
    >
    </u-tabbar>
  </view>
</template>

<script>
    import {
        mapState,
        mapMutations,
        mapGetters,
        mapActions
    } from 'vuex';
export default {
  data() {
    return {
      tabbar: getApp().globalData.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.WeappPublic.$tcolor, //全局主题颜色
      UserType: uni.getStorageSync("UserType"), //当前是 用户 || 商家
    };
  },
  computed:{
    ...mapState("WeappPublic",['userInfo'])
  },
  methods: {
    ...mapMutations("user",["userlogout"]),
    onShow(){

      let i = uni.getStorageSync('UserInfo'); //头像 name
      if(Object.keys(i).length != 0 ){
        this.userInfo.username = i.usernmae;
        this.userInfo.img = i.img;
      }
       
    },
    thisLogout(){ //注销

      if(Object.keys(uni.getStorageSync("UserInfo")).length <= 0 )return;//防止多次点击注销

      this.userlogout();

    },

    getuserinfo(e) {

      if (uni.getStorageSync("UserInfo")) {
        //本地存在用户数据
        // this.getUserInfoFlagFun();
        console.warn("个人中心:\n已有数据不需要请求\n直接进入页面");
        return;
      }


      uni.showToast({
        title:'请授权登录',
        icon:'none',
        success:()=>{
          setTimeout(() => {
            uni.navigateTo({url: "/platforms/mp-weixin/y-cosplayMask/index",});
          }, 1500);
        }
      })


      

      // if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) return console.warn("本地已经有数据防止多次点击");

      // this.userLogin() //调用静默登录
      //   .then((res) => {
      //     //登录成功回调

      //     let UserInfo = uni.getStorageSync("UserInfo");
      //     this.userInfo.usernmae = UserInfo.usernmae;
      //     this.userInfo.img = UserInfo.img;
      //     return uni.showToast({ title: "登录成功" });
      //   })
      //   .catch((err) => {
      //     //拒绝授权
      //     uni.showToast({
      //       title: "登录失败,请授权登录后查看更多信息",
      //       icon: "none",
      //     });
      //   });
    },


    beforeSwitch(index) {
      //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
      // console.log(index)
      return true;
    },
  },

  onShow() {},
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
