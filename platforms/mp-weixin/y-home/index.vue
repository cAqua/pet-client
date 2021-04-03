<template style="background-color: #f7f7f7">
  <scroll-view scroll-y="true" class="home_body">
    <view class="home">
      <!-- 轮播图 -->
      <uni-swiper-dot class="uni-swiper-dot" :current="current" :info="info">
        <swiper
          class="swiper-box"
          @change="swiperSlide"
          autoplay="true"
          circular="true"
          next-margin="5px"
          previous-margin="5px"
        >
          <!-- indicator-dots="true" -->
          <swiper-item v-for="(item, index) in swiperInfo" :key="index">
            <view class="swiper-item">
              <image :src="item.content" mode="scaleToFill" />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>

      <!-- 			<uni-search-bar class="uni-search-bar" placeholder="输入查询店铺名称" radius="15" clearButton="auto" maxlength="10"
				@confirm="search">
			</uni-search-bar> -->
      <!-- 搜索框 -->
      <view class="search">
        <view class="search_Card">
          <u-search
            bgColor="#ffffff"
            class="u-search"
            shape="spuare"
            placeholder="搜索附近商家"
            v-model="searchConteng"
            :clearabled="true"
          ></u-search>
        </view>
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
                  <u-icon name="clock" size="36"></u-icon>
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

                <button size="mini" type="default" @click="ToDetail()">
                  进店
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>

      <drag-button
        v-show="!UmaskFlag"
        :isDock="true"
        :existTabBar="true"
        @btnClick="ToChatList()"
      />
    </view>

    <!-- uView自定义导航栏 -->
    <u-tabbar
      :list="tabbar"
      :mid-button="true"
      :active-color="$tcolor"
      :before-switch="beforeSwitch"
    >
    </u-tabbar>
  </scroll-view>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { getUserInfoApi } from "@/store/mp-weixin/Weapp-User-Api.js";
import dragButton from "@/components/mp-weixin/drag-button/drag-button.vue"; //悬浮按钮

export default {
  components: { dragButton },
  data() {
    return {
      tabbar: getApp().globalData.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.home.$tcolor, //全局主体颜色

      searchConteng: "", //搜索框的值
      current: 0, //轮播图索引
      swiperInfo: [
        {
          content: "/static/mp-weixin/home_image/1.jpg",
        },
      ],
      MerchantList: [
       
      ],
    };
  },
  created() {},
  onLoad() {

    uni.getLocation({
      type: 'wgs84',
      success:(i)=>{
        console.log(i);

        //发起当前用户地理位置 店铺信息
        
      },
      fail:(e)=>{
        console.log(e);

        //展示默认的地理位置信息
        this.MerchantList = [
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
      ]
      }
      
    })
    
  },
  methods: {
    ToDetail() {
      //商家详情

      // 需求,当点击了 用户 || 商家的时候 展示不一样的tabbar和列表

      if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) {
        //本地存在用户数据
        this.getUserInfoFlagFun();
        console.warn("首页:已有数据不需要请求");
        uni.navigateTo({
          url: "./home-details/index",
        });

        return;
      }

      //本地没有用户数据会访问 请求
      // this.userLogin();
    },
    ToChatList() {
      //to聊天列表

      uni.navigateTo({
        url: "/platforms/mp-weixin/y-ChatList/index",
      });
    },

    getMerchantInfo() {
      //获取商家 信息
      console.log("开始获取商家数据");
    },



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

    beforeSwitch(index) {
      //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
      // console.log(index)
      return true;
    },
    ...mapMutations("home", ["userLogin"]), //登录退出
    ...mapMutations("home", {
      //防止多次点击
      getUserInfoFlagFun: "getUserInfoFlag",
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

  .selectBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .rectt {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 30rpx;
      width: 100%;
      height: 120px;
      // background-color: #fff;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        margin: 0 40rpx;
        color: #ffffff;
      }
    }
  }

  .home {
    background: #f1f0f1;
    // margin-top: 100rpx;

    // .uni-search-bar {
    //搜索栏
    // width: 100%;
    // position: fixed;
    // top: 0;
    // z-index: 99;
    // }

    .search {
      //搜索栏
      width: 100%;
      height: 114rpx;
      height: 150rpx;
      display: flex;
      // |		flex-direction: column;
      align-items: center;
      justify-content: center;

      .search_Card {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 95%;
        height: 114rpx;
        border-radius: 7rpx;
        background: #ffffff;
        padding: 15rpx 20rpx;
        .u-search {
          width: 100%;
          border: 2rpx solid #e6e6e6;
          border-radius: 10rpx;
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

    //附近商家标题
    // .Merchant_title {
    //   display: flex;
    //   align-items: center;
    //   margin: 10px;
    //   width: 95%;
    //   height: 52px;
    //   padding-left: 2%;
    //   background: linear-gradient(to top right, #bbdefa, $tcolor);
    //   border-radius: $uni-border-radius-lg;

    //   .Merchant_title_main {
    //     width: 100%;
    //     border-left: 4rpx solid #ffffff;
    //     display: flex;
    //     flex-direction: column;
    //     font-size: $uni-font-size-title;
    //     padding-left: 2%;
    //     color: #ffffff;
    //     font-weight: 700;

    //     .nearby {
    //       font-weight: normal;
    //       font-size: $uni-font-size-sm;
    //     }
    //   }
    // }
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
          uni-icons {
          }
        }
      }

      .R_info {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        font-size: $uni-font-size-base;
        .distance {
        }

        // .detail {
        button {
          background-color: $tcolor;
          color: #ffffff;
          padding: 2rpx 45rpx;
          border-radius: 9rpx;
        }
        // }
      }
    }
  }
}
</style>
