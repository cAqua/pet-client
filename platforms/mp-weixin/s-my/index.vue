<template>
  
<view>

  <view>

个人中心
    
  </view>



    <!-- uView自定义导航栏 -->
    <u-tabbar
      :list="tabbar"
      :active-color="$tcolor"
      :before-switch="beforeSwitch"
    >
    </u-tabbar>

  </view>
</template>

<script>
export default {
  name: 's-chatList',
  components: {  },
  directives: {  },
  data() {
    return {
      tabbar: getApp().globalData.sViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.user.$tcolor, //全局主体颜色

    };
  },
  onLoad(){
    


    
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
</style>