<template>
  <!-- 遮罩层 -->

  <view class="wrap">

    <view
      class="cosplay"
      v-if="cosplayFlag"
    >
      <view class="select">选择您的角色</view>
      <view class="selectBtn">
        <button
          style="background-color: #2979ff"
          @click="cosplay('user')"
        >
          用户
        </button>
        <button
          style="background-color: #fa3534"
          @click="cosplay('merchant')"
        >
          商家
        </button>
      </view>
    </view>

    <u-modal
      @confirm='ModelTrue'
      @cancel="ModelFalse"
      v-model="ModelFlag"
      :show-cancel-button="ModelStyle.ModelNoBtn"
      :content="ModelStyle.content"
      :confirm-text="ModelStyle.confirmText"
      :cancel-text="ModelStyle.cancelText"
      :cancel-color="ModelStyle.cancelcolor"
      :confirm-color="ModelStyle.confirmcolor"
    ></u-modal>

    <u-modal
    @confirm='cosplay(info.UserType)'
    show-cancel-button
    v-model="cosplayModel"
    title='授权'
    content='请您授权用户信息'
    ></u-modal>

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
  import {mapActions} from 'vuex'
  import {ifStorte} from '@/store/mp-weixin/Weapp-User-Api'
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
        wxflag: true, //用户拒绝授权触发
        cosplayModel:false, //用户选择模态框


      }
    },
    onLoad() {
      // 打开调试
      //#ifdef MP-WEIXIN
      wx.setEnableDebug({enableDebug: true,success: () => {},fail: () => {}});
      //#endif

      uni.checkSession({ //用户授权是否过期
        success:(res)=>{
          console.warn(res);
        },
        fail:(err)=>{
          console.warn(err);
        },
      })

      if   // 已注册,本地有数据>渲染用户列表 
      (
        (uni.getStorageSync('UserType') === 'user' && Object.keys(uni.getStorageSync('UserInfo')).length > 0) 
        ||
        (uni.getStorageSync('UserType') === 'merchant' && Object.keys(uni.getStorageSync('UserInfo')).length > 0) 
      ){
        //说明有数据不需要本页面,直接跳转到首页
        console.warn('本地有数据 开始渲染用户 || 商家 页面')
        return this.navigateToRoles() //跳转对应页面
      }

      this.IfRegistered() //到了这一步 说明本地没有数据,但不知道用户注册没有需要发起 请求判断用户是否注册过
        .then(res => {  

       

          if (res.desc === '用户已经存在') { //就不需要注册了 要调用按钮 授权新信息

            if (res.data[0].UserType === 'user' || res.data[0].UserType === 'merchant') {  // 远端用户类型为 用户
              this.info = res.data[0]; //用户 类型&&id
              //如果是用户让其可以没授权的情况登录 如果是商家则强行授权
              this.ModelStyle.ModelNoBtn = res.data[0].UserType === 'merchant' ? false:true; 
              this.ModelFlag = true; // 打开授权框
            }
           else {
              console.log(res);
            }


          } else if (res.desc === '用户未注册') {
            this.info.id = res.id
            this.cosplayFlag = true; //用户选择框状态
          }

        })


    },
    methods: {
      ...mapActions('user', ['Registered']), //用户注册
      ...mapActions('WeappPublic', ['IfRegistered','getUserInfo', ]),

      ModelTrue() { //模态框状态 如果模态框 打开了说明用户已经注册过了但本地没有数据

        this.getUserInfo(this.info) //获取用户信息
          .then(res => {

            uni.setStorage({ //用户信息
							key:'UserInfo',
							data:res,
							success: () => {
								uni.setStorage({
									key: 'UserType',	//客户类型 商家 || 用户
									data: res.UserType,
									success:()=>{
                    console.warn('储存成功');
                    this.navigateToRoles(); //获取用户信息成功渲染 对应商家||用户首页
                  }
								})
								
							},
							fail: () => {
								return uni.showToast({
									title: '存储类型错误',
								})
							},
						})
            
          })
          .catch(err => { //拒绝微信授权

            let UserType = this.info.UserType;

            if (err === 'refuse' && UserType === 'user') { 
              uni.showToast({
                title: '请授权',
                icon: 'none',
                success: () => {
                  uni.setStorage({
                    key: 'UserType', //客户类型 商家 || 用户
                    data: UserType,
                  })

                  if (this.wxflag) { //如果用户联系点击了 解决授权则会直接触发页面跳转
                    this.ModelFlag = true;
                    this.wxflag = false;
                    return
                  }
                  this.navigateToRoles();
                },
              })

            }else if(err === 'refuse' && UserType === 'merchant'){

              this.ModelFlag = true;

            }
            else{
              console.log(err);
            }

          })

      },
      ModelFalse() {//模态框取消

        uni.setStorage({
          key: 'UserType', //客户类型 商家 || 用户
          data: this.info.UserType,
        })

        this.navigateToRoles();

      },
      cosplay(e) { //遮罩层 如果打开了遮罩层 说明用户第一次登录让其  选择用户商家

      /* 

     如果是用户的话 用户确定授权 取消授权都可以跳转到 首页列表

     如果是商家的话必须 强制授权 才能进入页面 
     商家的话有俩种情况
     商家已注册 和商家未注册
     
     
      */
        //选择用户 商家 授权
        this.info.UserType = e;
        this.getUserInfo(this.info) //获取用户信息并返回
          .then(res => {

            let _info = res;

            if(e === 'user'){ //调用用户注册

              this.Registered(_info) //用户注册
                .then(res => {

                  if (res.desc === '插入成功') {//获取用户信息成功渲染 对应商家||用户首页
                    uni.setStorage({ //用户信息
                      key:'UserInfo',
                      data:_info,
                      success: () => {
                        uni.setStorage({
                          key: 'UserType',	//客户类型 商家 || 用户
                          data: _info.UserType,
                          success:()=>{
                            // console.warn('储存成功');
                          }
                        })
                        
                      },
                      fail: () => {
                        return uni.showToast({
                          title: '存储类型错误',
                        })
                      },
                    })
                    this.navigateToRoles() 
                  }


                })
                .catch(err => {
                  console.error(err);
                })

            }else if(e === 'merchant'){//调用商家注册

            uni.navigateTo({
              url:'/platforms/mp-weixin/s-register/index',
              success:()=>{
              setTimeout(() => { //疑问为什么这里页面传值需要 定时器才能触发
                uni.$emit('merchantInfo',_info)
              }, 100);
              },
              fail:(err)=>{
                console.log(err);
              }

            })
              
            }


          })
          .catch(err => {

            /*
            用户决绝了授权 在让他授权一次
            通过 : 注册用户信息 然后跳转商家首页
            第二次还是拒绝 : 跳转到首页 对应的 后续如果有关键操作 需要重新到此页面进行授权
            商家 拒接授权了 就提示弹框一直到 确定授权为止 才给注册
            */
            if(err === 'refuse' && this.info.UserType === 'user'){
               
              uni.showToast({
                title:'请选择角色并授权',
                icon:'none',
                success:()=>{
                  if(this.wxflag){
                    this.wxflag = false; 
                    this.cosplayModel = true;
                    return
                  }
                  this.navigateToRoles();
                },
              })

            }else if(err === 'refuse' && this.info.UserType === 'merchant'){

              this.cosplayModel = true;
              
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
        } else if ((uni.getStorageSync('UserType') === 'merchant' || this.info.UserType === 'merchant')) {
          console.log('开始渲染列表商家')
          uni.switchTab({
            // url: '/platforms/mp-weixin/s-my/index',
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