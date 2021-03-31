<template style="background-color: #f3f4f6;">
  <scroll-view scroll-y="true" class="home_body">
    <!-- 遮罩层 -->
    <u-mask
      v-if="UmaskFlag"
      :show="UmaskFlag"
      zoom="true"
      mask-click-able="false"
    >
      <view class="warp">
        <view class="rect">
          <button style="background-color: #2979ff" @click="Umask('user')">
            用户
          </button>
          <button style="background-color: #fa3534" @click="Umask('merchant')">
            商家
          </button>
        </view>
      </view>
    </u-mask>

    <view class="home">
      <!-- 搜索框 -->
      <uni-search-bar
        class="uni-search-bar"
        placeholder="输入查询店铺名称"
        radius="15"
        clearButton="auto"
        maxlength="10"
        @confirm="search"
      >
      </uni-search-bar>

      <!-- 轮播图 -->
      <uni-swiper-dot class="uni-swiper-dot" :current="current" :info="info">
        <swiper
          class="swiper-box"
          @change="swiperSlide"
          autoplay="true"
          circular="true"
          next-margin="5px"
          previous-margin="5px"
          indicator-dots="true"
        >
          <swiper-item v-for="(item, index) in swiperInfo" :key="index">
            <view class="swiper-item">
              <image :src="item.content" mode="aspectFill" />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>

      <view class="Merchant">
        <!-- 附近商家标题 后续可以考虑吧当前卡片封装成组件 -->
        <view class="Merchant_title">
          <view class="Merchant_title_main">
            <view class="nearby">NEARBY</view>
            <view>附近商家</view>
          </view>
        </view>

        <!--  主体 -->
        <view v-if="MerchantList.length > 0">
          <view
            class="Merchant_List"
            v-for="(item, index) in MerchantList"
            :key="index"
          >
            <view class="Merchant_info">
              <view class="Merchant_phone">
                <image :src="item.store_image"></image>
              </view>

              <view class="Merchant_introduce">
                <view>{{ item.name }}</view>
                <view>
                  <uni-icons type="phone-filled" size="18"></uni-icons
                  >{{ item.phone }}
                </view>
                <view>{{ item.label }}</view>
              </view>

              <!-- <button class="phone_btn" open-type="getUserInfo" @getuserinfo="getUserInfo"> -->

              <!-- 单击调用 用户数据统一插槽 -->
              <button class="phone_btn" @click="getUserInfo()">
                <image :src="item.btn_image"></image>
              </button>

              <!-- </button> -->
            </view>
            <view class="Merchant_place">
              <view class="icon">
                <uni-icons type="location-filled" size="18"></uni-icons>
              </view>
              <view class="detailed">
                {{ item.detailed }}
              </view>
              <view>距离{{ item.distance }} km</view>
            </view>
          </view>
        </view>
      </view>
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
import {
	getUserInfoApi
} from "@/store/mp-weixin/Weapp-User-Api.js";
export default {
  components: {},
  data() {
    return {
      tabbar: this.$store.state.home.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.home.$tcolor, //全局主体颜色
      UmaskFlag: this.$store.state.home.UmaskFlag, //显示 隐藏遮罩层
      // UserType: uni.getStorageSync("UserType"), //客户类型
      searchConteng: "", //搜索框的值
      current: 0, //轮播图索引
      swiperInfo: [
        {
          content: "/static/mp-weixin/home_image/1.jpg",
        },
        {
          content: "/static/mp-weixin/home_image/2.jpg",
        },
        {
          content: "/static/mp-weixin/home_image/3.jpg",
        },
        {
          content: "/static/mp-weixin/home_image/4.jpg",
        },
      ],
      MerchantList: [
        {
          store_image: "/static/mp-weixin/icon/store_image.png",
          name: "柴柴宠物店",
          phone: "130********",
          label: "宠物店",
          btn_image: "/static/mp-weixin/icon/phone_icon.png",
          detailed: "广东省天河区珠村南端大街三号",
          distance: "4.4",
        },
        {
          store_image: "/static/mp-weixin/icon/store_image.png",
          name: "柴柴宠物店",
          phone: "130********",
          label: "宠物店",
          btn_image: "/static/mp-weixin/icon/phone_icon.png",
          detailed: "广东省天河区珠村南端大街三号",
          distance: "4.4",
        },
        {
          store_image: "/static/mp-weixin/icon/store_image.png",
          name: "柴柴宠物店",
          phone: "130********",
          label: "宠物店",
          btn_image: "/static/mp-weixin/icon/phone_icon.png",
          detailed: "广东省天河区珠村南端大街三号",
          distance: "4.4",
        },
        {
          store_image: "/static/mp-weixin/icon/store_image.png",
          name: "柴柴宠物店",
          phone: "130********",
          label: "宠物店",
          btn_image: "/static/mp-weixin/icon/phone_icon.png",
          detailed: "广东省天河区珠村南端大街三号",
          distance: "4.4",
        },
        {
          store_image: "/static/mp-weixin/icon/store_image.png",
          name: "柴柴宠物店",
          phone: "130********",
          label: "宠物店",
          btn_image: "/static/mp-weixin/icon/phone_icon.png",
          detailed: "广东省天河区珠村南端大街三号",
          distance: "4.4",
        },
        {
          store_image: "/static/mp-weixin/icon/store_image.png",
          name: "柴柴宠物店",
          phone: "130********",
          label: "宠物店",
          btn_image: "/static/mp-weixin/icon/phone_icon.png",
          detailed: "广东省天河区珠村南端大街三号",
          distance: "4.4",
        },
      ],
    };
  },
  created() {


    setInterval(() => {
      
          //   getUserInfoApi({
          // "id":"osS0G5lXrmWZ9lM3WMvejFFf4Y78",
          // "usernmae":"Minato",
          // "img":"https://thirdwx.qlogo.cn/mmopen/vi_32/gqpgq8OicaDP4NEVvGTdhHhRKYbGa82NLthzS4maXJVNGqKHicGBjLzZZRmib7jgyMabqKZ7NovUW4HP00Kcq0qvw/132",
          // "place":"China-Guangzhou",
          // "source":"weixin",
          // "userlongitude":"116.3971281",
          // "userlaitude":"39.9165271"}).then(res=>{
          //   console.log(res);
          // })
      
    }, 10);

      
    
    
  },
  onLoad() {},
  methods: {
    ...mapMutations("home", ["userLogin"]), //登录退出
    ...mapMutations("home", { //防止多次点击
      getUserInfoFlagFun: "getUserInfoFlag",
    }),

    getUserInfo(e) {


      return 

      // console.log(
      //   uni.getStorageSync("UserInfo").id
      // );
      // if (Object.keys(uni.getStorageSync("UserInfo")).length > 0) {//本地存在用户数据
      //   this.getUserInfoFlagFun();
      //   console.warn("首页:已有数据不需要请求");
			// 	uni.navigateTo({
			// 		url:'./home-details/index',
			// 	})
        
      //   return
      // }
    

        this.userLogin();
      
    },

    getMerchantInfo() {
      //获取商家 信息
      console.log("开始获取商家数据");
    },

    Umask(e) {
      //遮罩层 选择用户商家
      this.UmaskFlag = false;
      uni.setStorage({
        key: "UmaskFlag",
        data: false,
        fail: () => {
          return uni.showToast({ title: "存储商家信息错误" });
        },
      });
      uni.setStorage({ key: "UserType", data: e }); //客户类型 商家 || 用户
      this.userLogin();
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
  .warp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .rect {
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
    margin-top: 100rpx;

    .uni-search-bar {
      //搜索栏
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 99;
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
    .Merchant_title {
      display: flex;
      align-items: center;
      margin: 10px;
      width: 95%;
      height: 52px;
      padding-left: 2%;
      background: linear-gradient(to top right, #bbdefa, $tcolor);
      border-radius: $uni-border-radius-lg;

      .Merchant_title_main {
        width: 100%;
        border-left: 4rpx solid #ffffff;
        display: flex;
        flex-direction: column;
        font-size: $uni-font-size-lg;
        padding-left: 2%;
        color: #ffffff;
        font-weight: 700;

        .nearby {
          font-weight: normal;
          font-size: $uni-font-size-sm;
        }
      }
    }
  }

  //商家信息
  .Merchant_List {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    margin: $uni-spacing-col-lg 0;
    font-size: $uni-font-size-base;

    .Merchant_info {
      display: flex;
      align-items: center;
      padding-right: 20rpx;

      .Merchant_phone {
        width: 130rpx;
        height: 130rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 45px;
          height: 45px;
        }
      }

      .Merchant_introduce {
        width: 70%;

        view {
          margin: 6rpx 0;
        }
      }

      .phone_btn {
        image {
          width: 45px;
          height: 45px;
        }
      }
    }

    .Merchant_place {
      display: flex;
      align-items: center;
      padding: 0 20rpx;

      .icon {
      }

      .detailed {
        flex: 2;
      }

      text {
      }
    }
  }
}
</style>


