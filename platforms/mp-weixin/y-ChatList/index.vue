<template style="background-color: #f7f7f7">
  <scroll-view scroll-y="true" >

    <view>聊天列表 </view>
    
    <!-- uView自定义导航栏 -->
    <u-tabbar
      :list="tabbar"
      :mid-button="true"
      :active-color="$tcolor"
      :before-switch="beforeSwitch"
    >
    </u-tabbar>
  </scroll-view>
</template>

<script>


export default {
  components: {  },
  data() {
    return {
     
    };
  },
  created() {},
  onLoad() {},
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>

</style>
