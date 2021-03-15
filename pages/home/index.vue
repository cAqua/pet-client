<template>
  <view class="home">123 </view>
</template>

<script>
import {getData} from '../../store/Weapp-User-Api.js'
export default {
  name: "home",
  components: {},

  data() {
    return {};
  },
  mounted() {



       getData()
     .then(res => {
      console.log(res);
    })
   

  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.home {
}
</style>