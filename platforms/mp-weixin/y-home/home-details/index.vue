<template>
  <view>
    <!-- 店铺信息 -->
    <view class="shop">
      <view class="shop_image"
        ><image
          src="/static/mp-weixin/home_image/storefront.jpeg"
          mode="widthFix"
      /></view>
      <view class="shop_info">
        <view class="shop_title">豆豆宠物医院</view>

        <view class="businessHours">
          <view>工作日 08:00~23:00</view>
          <view>周末 11:00~20:00</view>
        </view>

        <view class="phone">电话130********</view>
        <view class="position">
          <uni-icons type="location-filled" color="#d9111a" size="15" />
          广东省天河区珠村南端大街三号
        </view>
      </view>
    </view>

    <!-- 经营服务 -->
    <!-- <view>经营项目</view> -->

    <view class="service">
      <!-- 渲染行 -->
      <u-grid :col="3" v-for="(item, index) in serviceList" :key="index">
        <!-- 列 -->
        <u-grid-item v-for="(item2, index2) in item.items" :key="index2">
          <u-icon :name="item2.icon" :size="46"></u-icon>
          <view class="grid-text">{{ item2.itemName }}</view>
        </u-grid-item>
      </u-grid>
    </view>

    <!-- 地理位置 -->

    <!-- tabbar栏 -->
    <view class="drag-button">
      <view class="itemList">
        <view class="item">
          <u-icon name="share-fill" size="36"></u-icon>
          <view>分享</view>
        </view>
        <view class="item">
          <u-icon name="map-fill" size="36"></u-icon>
          <view>地址</view>
        </view>
        <view class="item">
          <u-icon name="heart" size="36"></u-icon>
          <view>收藏</view>
        </view>
      </view>

      <!-- <u-button class="btn" ripple-bg-color="#909399" ripple="true" :custom-style="btncustomStyle"
        >联系商家</u-button> -->

    <view class='btn'>
      <u-button @click="ToChatList()" class="btn" type='primary' ripple-bg-color="#accaff" ripple="true">联系商家</u-button>
    </view>

    </view>
  </view>
</template>

<script>
// import {mapState,mapMutations} from 'vuex'
/* 店铺图片
    店铺名
    工作时间
    电话号码
    店铺地址
    经营服务
     */

export default {
  data() {
    return {
      current: 0,
      serviceList: [
        {
          items: [
            { icon: "level", itemName: "洗澡" },
            { icon: "woman", itemName: "理发" },
            { icon: "man", itemName: "猫粮、狗粮" },
          ],
        },
        {
          items: [
            { icon: "chat-fill", itemName: "疫苗" },
            { icon: "red-packet", itemName: "摄影" },
            { icon: "lock", itemName: "护理" },
          ],
        },
        {
          items: [
            { icon: "home-fill", itemName: "玩具" },
            { icon: "photo", itemName: "日常用品" },
            { icon: "hourglass", itemName: "洗澡" },
          ],
        },
      ],
    };
  },
  computed: {},
  created() {},
  methods: {

    // ToChatList(){
    //   uni.navigateTo({

    //     url:'/platforms/mp-weixin/y-map/index'
    //   })
      
    // }

  },
};
</script>


<style lang="scss" scoped>
/* 店铺信息 */
.shop {
  position: relative;
  .shop_image {
    image {
      width: 100%;
    }
  }

  .shop_info {
    position: absolute;
    bottom: 20rpx;
    width: 85%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 30rpx;
    border-radius: 10rpx;
    font-size: $uni-font-size-base;
    background-color: rgba($color: #000000, $alpha: 0.7);
    color: #cccccc;
    .shop_title {
      font-size: $uni-font-size-title;
    }

    .businessHours {
      view {
      }
    }

    .phone {
    }

    .position {
      uni-icons {
      }
    }
  }
}

/* 经营项目 */
.service {
  u-icon {
    color: $tcolor;
  }

  .grid-text {
    font-size: 28rpx;
    margin-top: 4rpx;
    color: $u-type-info;
  }
}

/* 地图 */

/* 固定信息栏 */

.drag-button {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  .itemList {
    display: flex;
    flex: 1;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      u-icon {
      }
    }
  }

  .btn {
    // color: $tcolor;
    flex: 1;
    // .u-btn--primary{
    //   color: red;
    //   background-color: red;
    // }
  }
}
</style>