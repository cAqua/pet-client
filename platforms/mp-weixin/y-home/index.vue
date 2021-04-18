<template>
  <scroll-view
    scroll-y="true"
    class="home_body"
  >
    <view class="home">
      <!-- 轮播图 -->
      <uni-swiper-dot
        class="uni-swiper-dot"
        :current="swiper.current"
        :info="swiper.info.content"
      >
        <swiper
          class="swiper-box"
          @change="swiperSlide"
          autoplay="true"
          circular="true"
          next-margin="5px"
          previous-margin="5px"
        >
          <!-- indicator-dots="true" -->
          <swiper-item
            v-for="(item, index) in swiper.info"
            :key="index"
          >
            <view class="swiper-item">
              <image
                :src="item.content"
                mode="scaleToFill"
              />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>

      <!-- 			<uni-search-bar class="uni-search-bar" placeholder="输入查询店铺名称" radius="15" clearButton="auto" maxlength="10"
				@confirm="search">
			</uni-search-bar> -->
      <!-- 搜索框 -->
      <view class="search_Card">

        <view class="search">

          <view
            class="positionIcon"
            :style="{color:positionStyle.color ? positionStyle.color : '#bfbfbf'}"
            @click='position()'
          >
            <image :src=" '/static/mp-weixin/icon/'+ [positionStyle.icon ? positionStyle.icon : '/site.png'] "></image>
            <view>定位</view>
          </view>

          <u-search
            bgColor="#ffffff"
            class="u-search"
            shape="spuare"
            placeholder="搜索附近商家"
            v-model="searchContent"
            :clearabled="true"
          ></u-search>
        </view>

        <navigator
          url='/platforms/mp-weixin/y-map/index'
          class="address"
        >
          <image :src=" '/static/mp-weixin/icon/'+ style.mapIcon"></image>
          <view>地图找店</view>
        </navigator>

      </view>

      <view class="Merchant">
        <!--  主体 -->
        <view v-if="MerchantList.length > 0">
          <view
            class="Merchant_list"
            v-for="(item, index) in MerchantList"
            :key="index"
          >
            <view class="item">
              <view class="L_info">
                <view class="shopName">{{ item.shopName }}</view>

                <view class="range">{{ item.range }}</view>

                <view class="BusinessHours">
                  <!-- <uni-icons type="phone-filled" ></uni-icons> -->
                  <u-icon
                    name="clock"
                    size="36"
                  ></u-icon>
                  {{ item.BusinessHours }}
                </view>

                <view class="address">
                  <uni-icons
                    type="location-filled"
                    size="18"
                    color="#e21a43"
                  ></uni-icons>
                  {{ item.address }}
                </view>
              </view>

              <view class="R_info">
                <view class="distance">{{ item.distance }}</view>

                <view class="btn">
                  <u-button
                    type='primary'
                    ripple-bg-color="#accaff"
                    ripple="true"
                    throttle-time='1600'
                    @click="ToDetail()"
                    :custom-style="style.customStyle"
                  >
                    进店
                  </u-button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- <drag-button
        v-show="!UmaskFlag"
        :isDock="true"
        :existTabBar="true"
        @btnClick="ToChatList()"
      /> -->
    </view>

    <!-- uView自定义导航栏 -->
    <u-tabbar
      :list="tabbar"
      :mid-button="true"
      :active-color="$tcolor"
      inactive-color='#bfbfbf'
      :before-switch="beforeSwitch"
    >
    </u-tabbar>
  </scroll-view>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { uploadLongitude } from "@/store/mp-weixin/Weapp-public-Api.js";
// import dragButton from "@/components/mp-weixin/drag-button/drag-button.vue"; //悬浮按钮

export default {
  // components: { dragButton },
  data() {
    return {
      tabbar: getApp().globalData.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.WeappPublic.$tcolor, //全局主体颜色
      style:{ //页面样式
        mapIcon: "_map.png",
        customStyle:{height:'34px'}, //找店按钮样式
      },
      swiper:{//轮播图
        info: [ 
          {
            content: "/static/mp-weixin/home_image/1.jpg",
          },
        ],
        current: 0, //轮播图索引
      },
      searchContent: "", //搜索框的值
      MerchantList: [

            {
            shopName: "柴柴宠物店",
            range: "经营范围洗澡、狗粮、宠物用品",
            BusinessHours: "营业时间 : 10:00-22:00",
            address: "广东省天河区珠村南端大街三号",
            distance: "500m",
          },
          {
            shopName: "员村宠物店",
            range: "经营范围洗澡、狗粮、宠物用品",
            BusinessHours: "营业时间 : 8:00-22:00",
            address: "广东省天河区员村南端大街三号",
            distance: "600m",
          },
          {
            shopName: "黄村宠物店",
            range: "经营范围洗澡、狗粮、宠物用品",
            BusinessHours: "营业时间 : 6:00-18:00",
            address: "广东省天河区黄村南端大街三号",
            distance: "1.2km",
          },
          {
            shopName: "珠村宠物店",
            range: "经营范围洗澡、狗粮、宠物用品",
            BusinessHours: "营业时间 : 9:00-18:00",
            address: "广东省天河区珠村南端大街三号",
            distance: "3.0km",
          },
          {
            shopName: "车陂宠物店",
            range: "经营范围洗澡、狗粮、宠物用品",
            BusinessHours: "营业时间 : 08:00-16:00",
            address: "广东省天河区车陂南端大街三号",
            distance: "10km",
          },
        
      ],//商家列表
      UserLocation:{},//位置信息
    };
  },
  computed:{
    positionStyle(){ //定位图标字体颜色
        if(Object.keys(this.UserLocation).length > 0){
          // console.log('成功');
          return {icon:'_site.png',color:'#e42a50',}
        }else{
          // console.log('失败');
          return {icon:'site.png',color:'#bfbfbf',}
        }
    }
  },
  watch:{


    
  },
  onReady() {


    this.getposition();

      

    
  },
  methods: {
    //组件事件------------------------------
    search(e) {
      //搜索框触发
      console.log(e);
    },
    swiperSlide(e) {
      //轮播图 滑动触发
      this.current = e.detail.current;
    },
    onReachBottom() {
      //触底函数
      console.log("触底增加列表数据");
    },
    beforeSwitch(index) {//tabbar 切换 前 事件
      // console.log(index)
      return true;
    },
    getposition(){ //获取列表
          
      this.getUserPosition() //获取 经纬度
      .then(res =>{
        // this.UserLocation = res;
        if(res.longitude){

          this.UserLocation = res;//经纬度

          this.getStorageUserInfo().then(({id})=> {

            uploadLongitude({ //获取首页列表
              id:id,
              typename:0,
              userlongitude:res.longitude,
              userlaitude:res.latitude,
            })
            .then(res=>{
                console.log(res);
              })
            .catch(err =>{
              console.log(err);
            })
            
          })
 




          
          
        }
      })
      .catch(err =>{
        console.error(err);
      })
    },



    //页面跳转------------------------------ 
    ToDetail() { //商家详情页
      //如果在遮罩层没有授权,则这里需要授权后才能进入

    
      return

      if (uni.getStorageSync("UserInfo")) {
        //本地存在用户数据
        // this.getUserInfoFlagFun();
        console.warn("首页:\n已有数据不需要请求\n直接进入页面");
        uni.navigateTo({
          url: "./home-details/index",
        });
        return;
      }


      uni.showToast({
        title:'请授权登录',
        icon:'none',
        success:()=>{
          setTimeout(() => {
            uni.navigateTo({url: "/platforms/mp-weixin/y-cosplayMask/index",      });
          }, 1500);
        }
      })

    },
    ToChatList() {//to聊天列表
      

      uni.navigateTo({
        url: "/platforms/mp-weixin/y-ChatList/index",
      });
    },


    // vuex函数引入
    ...mapActions("home", ["getUserInfo"]), //异步登录退出
    ...mapActions("WeappPublic", ["getUserPosition","getStorageUserInfo"]), //获取地理位置
    ...mapMutations("home", {
      //防止多次点击
      // getUserInfoFlagFun: "getUserInfoFlag",
    }),

  },
};
</script>

<style lang="scss" scoped>
.home_body {
  button {
    padding: 0;
    margin: 0;
  }

  button::after {
    border: none;
  }

  .home {
    background: #f1f0f1;
    // margin-top: 100rpx;
    .search_Card {
      // 搜索栏
      width: 100%;
      height: 114rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      margin: 10rpx 0;
      padding: 0 5rpx;

      /* 地图找店 */
      .address {
        width: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 19rpx;
        margin-left: 2rpx;
        image {
          width: 50rpx;
          height: 50rpx;
        }
      }

      /* 搜索框内部 */
      .search {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        height: 114rpx;
        border-radius: 7rpx;
        // margin: 15rpx 0;

        .u-search {
          width: 90%;
          border: 2rpx solid #e6e6e6;
          // border-radius: 10rpx;
        }
        .positionIcon {
          width: 10%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 19rpx;
          font-weight: 600;
          image {
            width: 50rpx;
            height: 50rpx;
          }
        }
      }
    }

    //轮播图
    .uni-swiper-dot {
      .swiper-box {
        .swiper-item {
          image {
            width: 100%;
            border-radius: 20rpx;
            height: 300rpx;
            box-shadow: darkgrey 0px 0px 30px 5px;
          }
        }
      }
    }
  }

  //商家信息
  .Merchant_list {
    width: 100%;
    height: 300rpx;
    background-color: #ffffff;
    border-top: 4rpx solid #dcdcdc;
    border-bottom: 4rpx solid #dcdcdc;
    padding: 30rpx;
    .item {
      width: 100%;
      height: 100%;
      // background-color: aqua;
      display: flex;
      justify-content: center;
      .L_info {
        flex: 8;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        font-size: $uni-font-size-base;
        .shopName {
          font-size: $uni-font-size-title;
          font-weight: 700;
        }

        .range {
          color: $tcolor;
          font-size: $uni-font-size-lg;
        }

        .BusinessHours {
          display: flex;
          align-items: center;
          u-icon {
            color: $tcolor;
          }
        }

        .address {
          display: flex;
          align-items: flex-start;
        }
      }

      .R_info {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        font-size: $uni-font-size-base;
      }
    }
  }
}

//  this.MerchantList = [
//   {
//     shopName: "柴柴宠物店",
//     range: "经营范围洗澡、狗粮、宠物用品",
//     BusinessHours: "营业时间 : 10:00-22:00",
//     address: "广东省天河区珠村南端大街三号",
//     distance: "500m",
//   },
//   {
//     shopName: "员村宠物店",
//     range: "经营范围洗澡、狗粮、宠物用品",
//     BusinessHours: "营业时间 : 8:00-22:00",
//     address: "广东省天河区员村南端大街三号",
//     distance: "600m",
//   },
//   {
//     shopName: "黄村宠物店",
//     range: "经营范围洗澡、狗粮、宠物用品",
//     BusinessHours: "营业时间 : 6:00-18:00",
//     address: "广东省天河区黄村南端大街三号",
//     distance: "1.2km",
//   },
//   {
//     shopName: "珠村宠物店",
//     range: "经营范围洗澡、狗粮、宠物用品",
//     BusinessHours: "营业时间 : 9:00-18:00",
//     address: "广东省天河区珠村南端大街三号",
//     distance: "3.0km",
//   },
//   {
//     shopName: "车陂宠物店",
//     range: "经营范围洗澡、狗粮、宠物用品",
//     BusinessHours: "营业时间 : 08:00-16:00",
//     address: "广东省天河区车陂南端大街三号",
//     distance: "10km",
//   },
// ];
</style>
 

