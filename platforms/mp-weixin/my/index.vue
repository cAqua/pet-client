<template>
  <view class="MyBody">
    <my-personage 
		v-if="UserType === 'user'"
		></my-personage>
		<!-- :info=UserInfo -->

    <my-merchant v-if="UserType === 'merchant'"></my-merchant>

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
export default {
  data() {
    return {
      tabbar: this.$vuex.state.uViewTabBar, //刷新tabbar
      $tcolor: this.$vuex.state.$tcolor, //全局主题颜色
      UserType: uni.getStorageSync("UserType"), //当前是 用户 || 商家
			// UserInfo:uni.getStorageSync("UserInfo"),
    };
  },
  onLoad() {


  },
  methods: {


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
