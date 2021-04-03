  <template>
  <!-- 遮罩层 -->

  <view class="wrap" v-if="UmaskFlag">
    <view class="rect">
      <view class="select">选择您的角色</view>
      <view class="selectBtn">
        <button style="background-color: #2979ff" @click="Umask('user')">
          用户
        </button>
        <button style="background-color: #fa3534" @click="Umask('merchant')">
          商家
        </button>
      </view>
    </view>
  </view>
</template>
  
<script>
/* 
登录流程  
打开遮罩层 选择用户还是商家
用户 : 遮罩层|关闭遮罩层 >弹出授权 >无论关闭与否都关闭遮罩层 >首页|授权地址 如果授权了地址展示附近商家 如果没有授权 默认展示广州附近地址
商家 : 跳转个人中心 > 注册 登录

*/
export default {
  data() {
    return {
      UmaskFlag: false, //显示 隐藏遮罩层
    };
  },
  created() {
    //判断当前是否选择了角色 看是否弹窗让用户选择
    // this.UmaskFlag = uni.getStorageSync('UserType').length > 0 ?  false : true;

    if (uni.getStorageSync("UserType") || uni.getStorageSync("UmaskFlag")) {
      //说明有数据不需要本页面,直接跳转到首页
      return uni.switchTab({url: "/platforms/mp-weixin/y-home/index",});
      
    }
    this.UmaskFlag = true;
  },
  methods: {
    Umask(e) {
      //遮罩层 选择用户商家

      uni.getUserProfile({
        desc: "获取用户信息登录",
        success: (i) => {
          this.UmaskFlag = false; //关闭遮罩层

          uni.setStorage({
            key: "UserInfo",
            data: i.userInfo,
            fail: () => {
              return uni.showToast({ title: "存储用户信息错误" });
            },
          });
          uni.setStorage({ key: "UmaskFlag", data: false });
          uni.setStorage({
            key: "UserType",
            data: e,
            success: () => {
              uni.switchTab({url: "/platforms/mp-weixin/y-home/index",});
            },
            fail: () => {
              return uni.showToast({ title: "存储类型错误" });
            },
          }); //客户类型 商家 || 用户
        },
        fail: (err) => console.warn("用户取消授权"),
      });

      // this.userLogin();
    },
  },
};
</script>

<style lang="scss" scoped>
//遮罩层
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  .rect {
    width: 100%;
    height: 30vh;
    font-size: $uni-font-size-lg;
    color: #ffffff;

    .select {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 20%;
      color: #000000;
    }

    .selectBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 45%;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 175rpx;
        height: 175rpx;
        margin: 0 40rpx;
        border-radius: 50%;
        color: #ffffff;
      }
    }
  }
}
</style>
