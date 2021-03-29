<template>
  <view class="MyBody">
    <view class="personalInfo">
      <view class="info">
        <view class="portrait">
          <image :src="userPortrait"></image>
        </view>

        <view class="name">
          <view>
            <button
              hover-class="none"
              open-type="getUserInfo"
              @getuserinfo="getuserinfo"
            >
              {{ userName }}
            </button>
          </view>

          <view class="icon">
            <uni-icons type="arrowright" size="18" color="#ffffff"></uni-icons>
          </view>
        </view>

        <view> </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfoApi } from "@/store/mp-weixin/Weapp-User-Api.js";
export default {
  data() {
    return {
      tabbar: this.$store.state.home.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.home.$tcolor, //全局主题颜色
      userPortrait: "../../../static/mp-weixin/icon/default-portrait.png", //头像
      userName: "Hi,您尚未登录",
      getUserInfoFlag:true,
      userInfo:{}, //用户信息
    };
  },
  props: {
    info: {
      type: Object,
    },
  },
  created() {
    //页面进入判断本地有没有缓存
    if ( Object.keys(uni.getStorageSync("UserInfo")).length > 0) {
        let info = uni.getStorageSync("UserInfo")
        this.userPortrait = info.img;
        this.userName = info.usernmae;
        this.getUserInfoFlag = false;
        console.warn('该登录类型是其他页面登录了所以这里不用获取缓存');
    }
  },
  methods: {
    getuserinfo(e) {


      let _this = this;

      if (this.getUserInfoFlag == false) return console.warn('防止多次点击');

      if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) {//本地存在用户数据
        let info = uni.getStorageSync("UserInfo")
        this.userPortrait = info.img;
        this.userName = info.usernmae;
        this.getUserInfoFlag = false;
        console.warn("该登录类型是,用户在首页没有确定授权在本页面需要登录,点击按钮触发");
        return uni.showToast({title:'登录成功',icon:'success'})
      }

      // 能进入这里的说明授权点了确定 而且是第一次进入并且本地没有数据
      if (e.detail.userInfo) {


        let i = e.detail.userInfo;
        uni.login({
          provider: "weixin",
          success: function (res) {
            let appid = "wx2603e459c7f9b084";
            let secret = "9fd640b3208f6e196258b7b9324d0504";
            let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret +"&js_code=" + res.code + "&grant_type=authorization_code";
            uni.request({
              url: url, // 请求路径
              success: (result) => {

                _this.userInfo = {
                    id: result.data.openid,  //唯一id
                    usernmae: i.nickName, //name
                    img: i.avatarUrl, //头像
                    place: `${i.country}-${i.city}`, //中国--XX
                    source: "weixin",  //来源
                    userlongitude: "116.3971281", //经度
                    userlaitude: "39.9165271", //纬度
                  };

                  

                getUserInfoApi(_this.userInfo)
                .then(res => {

                  if(res.code  == 0){
                    return uni.showToast({title:'登录失败请再次点击登录按钮'})
                  }else if(res.code  == -1){
                    
                  if(res.desc == '用户已经存在' || '插入成功'){

                    _this.userPortrait = _this.userInfo.img; //头像
                    _this.userName = _this.userInfo.usernmae; //名字
                    _this.getUserInfoFlag = false; //防止多次点击
                    uni.setStorage({
                      key:"UserInfo",
                      data: _this.userInfo,
                      success:()=>{uni.showToast({title:'登录成功',icon:'success'})}
                      });  //用户信息存在本地

                    }else{
                      console.error('出现错误' + res.desc);
                    }
                  }
                    
                })
                .catch(error => {
                  console.error(error);
                })

              },
            });
          },
          fail:(error) => console.warn(error),
        });

        


      } else {
        //点击了取消授权
        uni.showToast({
          title: "请允许授权",
          icon: "none",
        });
      }

      
    },

    beforeSwitch(index) {
      //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
      // console.log(index)
      // return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.MyBody {
  //个人信息
  .personalInfo {
    display: flex;
    align-items: center;
    width: 750rpx;
    height: 240rpx;
    padding: 20rpx;
    background: linear-gradient(to top right, #bbdefa, $tcolor);

    .info {
      width: 100%;
      display: flex;

      .portrait {
        flex: 2;
        font-size: 38rpx;

        image {
          width: 150rpx;
          height: 150rpx;
        }
      }

      .name {
        flex: 8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20rpx;
        font-size: 38rpx;

        button {
        color: #ffffff;
          background: none;
          padding: 0;
          margin: 0;
        }
        button::after {
          border: none;
        }

        // 点击时样式
        .button-hover {
          color: rgba(0, 0, 0, 0.6);
          background-color: #fff;
        }
      }
    }
  }
}
</style>
