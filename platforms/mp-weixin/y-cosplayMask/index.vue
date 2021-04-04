  <template>
  <!-- 遮罩层 -->

  <view class="wrap" v-if="wrapFlag">
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      wrapFlag:false
    };
  },
  created() {
    //判断当前是否选择了角色 看是否弹窗让用户选择
    if (uni.getStorageSync("UserType")) {
      //说明有数据不需要本页面,直接跳转到首页
      return this.navigateToRoles() //跳转对应页面
    }
    this.wrapFlag = true
  },
  methods: {
    ...mapActions("home", ["userLogin"]),
    Umask(e) {
      //遮罩层 选择用户商家
      let that = this;
      this.userLogin()
        .then((res) => { //登录成功回调
         

            uni.setStorage({ //客户类型 商家 || 用户
              key: "UserType",
              data: e,
              success: () => {
                console.warn('登录成功  ' + res);
                  this.navigateToRoles()
                
              },
              fail: () => {return uni.showToast({ title: "存储类型错误" });},
            });
        
        })
        .catch((err) => {
          //拒绝授权

          if (err === "refuse") {

            uni.setStorage({ //客户类型 商家 || 用户
              key: "UserType",
              data: e,
              fail: () => {return uni.showToast({ title: "存储类型错误" });},
            });

            return this.navigateToRoles() //跳转对应页面
          }
        });
        
    },

    navigateToRoles(){

      if(uni.getStorageSync("UserType") =='user'){
        console.log('user');
        uni.switchTab({ url: "/platforms/mp-weixin/y-home/index" });
      }else{
        console.log('商家');
        uni.switchTab({ url: "/platforms/mp-weixin/s-chatList/index" });
      }
      
    }
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
