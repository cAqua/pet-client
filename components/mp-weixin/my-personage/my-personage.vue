<template>
  <view class="MyBody">



  </view>

  
</template>

<script>
// import { getUserInfoApi } from "@/store/mp-weixin/Weapp-User-Api.js";

/* 
需求,只要用户有登录状态 一进页面就需要给头像name赋值
实现方法 watch
这个值可能会在什么时候变化 
在用户进入个人中心页面的时候
在用户点击注销的时候


*/

export default {
  name: "home",
  data() {
    return {
    };
  },
  props: {},
  computed: {

  },

  created() {
    /* 
    需求 当用户进行 登录 注销的时候要 自动变化 头像跟名字
     */
  },

  methods: {


   
  },
};
</script>

