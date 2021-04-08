<template>
  <!-- 遮罩层 -->

  <view
    class="wrap"
    v-if="wrapFlag"
  >
    <view class="rect">
      <view class="select">选择您的角色</view>
      <view class="selectBtn">
        <button
          style="background-color: #2979ff"
          @click="Umask('user')"
        >
          用户
        </button>
        <button
          style="background-color: #fa3534"
          @click="Umask('merchant')"
        >
          商家
        </button>
      </view>
    </view>
  </view>
</template>




<script>
/* 
用户进入 此时可能有几种情况
用户第一次登录后台没数据 第二次登录后台有数据 前台也有数据 换设备登录前台没数据后台有数据
选择角色 授权登录       授权登录                         发送请求 

第一次进入 发送 判断用户是否 已注册请求

如果返回位空 弹框选择注册 如果为已注册 返回用户类型

第二进入 这是本地有用户类型 直接渲染对应用户类型

换设备||本地没有数据进入
发送请求 返回了 用户类型一样渲染



*/
import { mapActions } from 'vuex'
import {ifStorte} from '@/store/mp-weixin/Weapp-User-Api'
export default {
  data() {
    return {
      wrapFlag: false,
    }
  },
  created() {
        
    // 判断当前是否选择了角色 看是否弹窗让用户选择
    if (uni.getStorageSync('UserType') === 'user' &&  Object.keys(uni.getStorageSync('UserInfo')).length > 0) {
      //说明有数据不需要本页面,直接跳转到首页
      console.warn('本地有数据 开始渲染用户列表')
      return this.navigateToRoles() //跳转对应页面
    }


    this.wrapFlag = true;

    // ifStorte() //判断用户是否存在
    // .then(res => { 
      
    //
 


    //   console.log(res);
    // return
    // if(res.desc === '用户未注册'){

    //   this.wrapFlag = true;

      
    // }else if(res.desc === '用户已存在' && res.data.userType === 'user' ){

      
    //   this.navigateToRoles()
     

    // }

        
        
    // })

    // this.userLogin()
    //   .then(res => {
    //     console.log(res);
    //   })
    


/* 
进入这里说明本地没有数据 需要点击按钮 触发 getUserProfile 获取数据


   进入页面 发送请求 判断 用户注册了没 
   如果注册了 返回的是user 或者 商家  这时候 可以直接渲染用户表

   如果没有注册 则弹窗让用户选择角色 ,后进行注册 

*/


    


  },
  methods: {
    ...mapActions('home', ['userLogin']),
    Umask() {
      //遮罩层 选择用户商家

      /* 
      进入页面

      
      */
      
      
      return
      this.userLogin() //高调登录
        .then((res) => {
          //登录成功回调


          console.log(res);
          // uni.setStorage({
          //   //客户类型 商家 || 用户
          //   key: 'UserType',
          //   data: e,
          //   success: () => {
          //     console.warn('登录成功  ' + res)
          //     this.navigateToRoles()
          //   },
          //   fail: () => {
          //     return uni.showToast({
          //       title: '存储类型错误',
          //     })
          //   },
          // })
        })
        .catch((err) => {
          //拒绝授权
          console.log(err);
          return
          
          if (err === 'refuse') {
            uni.setStorage({
              //客户类型 商家 || 用户
              key: 'UserType',
              data: e,
              fail: () => {
                return uni.showToast({
                  title: '存储类型错误',
                })
              },
            })
            return this.navigateToRoles() //跳转对应页面
          }
        })
    },

    navigateToRoles() {
      //跳转对应详情页面
      
      if (uni.getStorageSync('UserType') === 'user') {

        uni.switchTab({
          url: '/platforms/mp-weixin/y-home/index',
        })
      } else {
        console.log('开始渲染列表商家')
        uni.switchTab({
          url: '/platforms/mp-weixin/s-chatList/index',
        })
      }
    },
  },
}
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
