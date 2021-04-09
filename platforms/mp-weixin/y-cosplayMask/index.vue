<template>
  <!-- 遮罩层 -->

  <view class="wrap">

    <view class="cosplay" v-if="cosplayFlag">
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

    <u-modal @confirm='ModelTrue' @cancel="ModelFalse" v-model="ModelFlag" :show-cancel-button="ModelStyle.ModelNoBtn"
      :content="ModelStyle.content" :confirm-text="ModelStyle.confirmText" :cancel-text="ModelStyle.cancelText"
      :cancel-color="ModelStyle.cancelcolor" :confirm-color="ModelStyle.confirmcolor"></u-modal>

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
  import {
    mapActions
  } from 'vuex'
  import {
    ifStorte
  } from '@/store/mp-weixin/Weapp-User-Api'
  export default {
    data() {
      return {
        ModelStyle: { //授权框样式
          ModelNoBtn: true,
          content: '为了更好的用户体验请您授权',
          confirmText: '是',
          cancelText: '否',
          cancelcolor: '#2979ff',
          confirmcolor: '#fa3534',
        },
        cosplayFlag: false, //角色选择框状态
        ModelFlag: false, //授权框状态
        info: {}, //用户类型
        wxflag: true, //用户解决授权触发



      }
    },
    created() {

      // 打开调试
      //#ifdef MP-WEIXIN
      wx.setEnableDebug({
        enableDebug: true,
        success: () => {
          console.log('成功调用');
        },
        fail: () => {}
      })
      //#endif



      // 已注册,本地有数据>渲染用户列表 
      if (uni.getStorageSync('UserType') === 'user' && Object.keys(uni.getStorageSync('UserInfo')).length > 0) {
        //说明有数据不需要本页面,直接跳转到首页
        console.warn('本地有数据 开始渲染用户列表')
        return this.navigateToRoles() //跳转对应页面
      }



      this.IfRegistered() //判断用户是否存在
        .then(res => {

          if (res.desc === '用户已经存在') { //就不需要注册了 要调用按钮 授权新信息

            // 有的信息 用户id 类型

            if (res.data[0].UserType === 'user') {
              this.info = res.data[0]; //用户类型 id
              this.ModelFlag = true; //授权框状态
            } else {
              console.log(res);
            }


          } else if (res.desc === '用户未注册') {
            this.info.id = res.id
            this.cosplayFlag = true; //用户选择框状态
          }



        })





      /* 
      进入这里说明本地没有数据 需要点击按钮 触发 getUserProfile 获取数据


         进入页面 发送请求 判断 用户注册了没 
         如果注册了 返回的是user 或者 商家  这时候 可以直接渲染用户表

         如果没有注册 则弹窗让用户选择角色 ,后进行注册 

        ifStorte 
        如果返回的是 用户已存在 就弹窗 用户授权按钮
        如果是未注册 就调用 插入表函数


      */





    },
    methods: {
      ...mapActions('home', ['IfRegistered', 'Registered', 'getUserInfo']),

      ModelTrue() { //模态框确定

        this.getUserInfo(this.info) //获取用户信息
          .then(res => {
            this.navigateToRoles(); //获取用户信息成功渲染 对应商家||用户首页
          })
          .catch(err => {

            if (err === 'refuse') { //拒绝微信授权

              uni.showToast({
                title: '请授权',
                icon: 'none',
                success: () => {
                  uni.setStorage({
                    key: 'UserType', //客户类型 商家 || 用户
                    data: this.info.UserType,

                  })

                  if (this.wxflag) {
                    this.ModelFlag = true;
                    this.wxflag = false;
                    return
                  }
                  this.navigateToRoles();
                },
              })

            }

          })

      },
      ModelFalse() { //模态框取消

        uni.setStorage({
          key: 'UserType', //客户类型 商家 || 用户
          data: this.info.UserType,

        })

        this.navigateToRoles();

      },

      Umask(e) { //遮罩层 选择用户商家


        //选择用户 商家 授权
        this.info.UserType = e
        this.getUserInfo(this.info) //获取用户信息
          .then(res => {

            if (res === '授权成功') {

              this.Registered()
                .then(res => {
                  console.log(res)

                  if (red.data.desc === '插入成功') {
                    this.navigateToRoles() //获取用户信息成功渲染 对应商家||用户首页
                  }


                })
                .catch(err => {
                  console.log(err);
                })

            }


          })
          .catch(err => {

            // if(err === 'refuse'){ //拒绝微信授权

            //   uni.showToast({
            //     title:'请授权',
            //     icon:'none',
            //     success:()=>{

            //       // if(this.wxflag){
            //       //   this.ModelFlag = true;
            //       //   this.wxflag = false;
            //       //   return
            //       // }
            //       // this.navigateToRoles();
            //     },
            //   })

            // }

          })


        return
        this.Registered() //高调登录
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

        // return console.log(this.info);
        if (uni.getStorageSync('UserType') === 'user' || this.info.UserType === 'user') {
          console.log('开始渲染用户列表')

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
    background: url("http://image.xinli001.com/20160819/062459l2mzm8sp93q59i16.jpg");
    background-size: 100% 100%;

    .cosplay {
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

    .slot-content {
      font-size: 28rpx;
      color: $u-content-color;
      padding-left: 30rpx;
    }
  }
</style>