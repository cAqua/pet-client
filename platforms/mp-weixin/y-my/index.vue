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
    ...mapState("home",['userInfo'])
  },
  methods: {
    ...mapMutations("home",["userlogout"]), //注销
    onShow(){

      let i = uni.getStorageSync('UserInfo');
      if(Object.keys(i).length != 0 ){
        console.log(i);
        this.userInfo.username = i.usernmae;
        this.userInfo.img = i.img;
      }
       
    },
    thisLogout(){ //注销

      // if(Object.keys(uni.getStorageSync("UserInfo")).length <= 0 )return;//防止多次点击注销

      this.userlogout();

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
