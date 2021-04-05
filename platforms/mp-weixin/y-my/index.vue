<template>
  <view class="MyBody">
    <my-personage ref='myPersonage'
		v-if="UserType === 'user'"
		></my-personage>
		<!-- :info=UserInfo -->

    <my-merchant v-if="UserType === 'merchant'"></my-merchant>

    <view style="width:100%;height:30px;text-align:center;background-color:aqua"
     @click="thisLogout()">注销</view>
    <!-- 自定义rabbar栏 -->
    <u-tabbar
      :list="tabbar"
      :mid-button="true"
      :active-color="$tcolor"
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
      $tcolor: this.$store.state.home.$tcolor, //全局主题颜色
      UserType: uni.getStorageSync("UserType"), //当前是 用户 || 商家
    };
  },
  computed:{




  },
  onLoad() {

    // uni.setStorage({
    //   //客户类型 商家 || 用户
    //   key: "UserType",
    //   data: "user",
    // });


      
  },
  methods: {
    ...mapMutations("home",["userlogout"]),

    thisLogout(){

      if(Object.keys(uni.getStorageSync("UserInfo")).length <= 0 )return;//防止多次点击注销

      this.$refs.myPersonage.userInfo = {usernmae: "Hi,您尚未登录",img: "/static/mp-weixin/icon/default-portrait.png",},
      this.userlogout()

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

</style>
