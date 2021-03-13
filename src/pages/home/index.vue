<template>
  <view class="home"> </view>
</template>

<script>
import {getData} from '../../js/Weapp-User-Api'
export default {
  name: "home",
  components: {},

  data() {
    return {};
  },
  mounted() {

    // this.request({
    //   url:"http://157.122.54.189:9088/image/v1/vertical/category",

    // }).then(result => [
    //   console.log(result)
    // ])
    console.log(
      this.request
    );
    

    
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.home {
}
</style>