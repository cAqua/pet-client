<template>
  <view class="content">
    <view class="PetCircle" v-for="(cont, ind) in user" :key="ind">
      <!-- 用户信息 -->
      <view class="Pet_user">
        <image :src="cont.img" mode="aspectFill"></image>
        <view class="name">
          {{ cont.usernmae }}
          <view class="user-f">
            {{ cont.DuaminTime }}
          </view>
        </view>
      </view>
      <!-- 标题 -->
      <view class="Pet_title pD">
        <text>
          {{ cont.DuamincContent }}
        </text>
      </view>
      <!-- 内容 -->
      <view class="Pet_img">
        <view
          class="P_main"
          v-for="(item, index) in cont.DuaminImg"
          :key="index"
        >
				<scroll-view>
          <image
					lazy-load	="true"
            mode="aspectFill"
            :src="url + item.content"
            @click="getImgIndex(index, ind)"
						 :fade-show="false"
          ></image>
					</scroll-view>
        </view>
      </view>
      <view class="Pet_icon">
        <view class="city">#{{cont.place}}</view>
        <u-icon
          :label="cont.num"
          label-size="26"
          size="45"
          @click="To(ind)"
          name="chat"
        ></u-icon>
      </view>
    </view>
    <!-- 发表按钮 -->
    <view class="Publish" @tap="go()">
      <u-icon name="plus" color="#666" size="36"></u-icon>
    </view>

    <!-- <u-divider bg-color="#f5f5f5">到底了</u-divider> -->
    <u-tabbar
      :list="tabbar"
      :mid-button="true"
      :active-color="$tcolor"
      :before-switch="beforeSwitch"
    ></u-tabbar>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { crcle, getUserInfoApi } from "@/store/mp-weixin/Weapp-User-Api.js";
import dragButton from "@/components/mp-weixin/drag-button/drag-button.vue"; //悬浮按钮
// import { crcle } from "@/store/mp-weixin/Weapp-User-Api.js"
export default {
  components: {
    dragButton,
  },
  data() {
    return {
      tabbar: getApp().globalData.uViewTabBar, //刷新tabbar
      $tcolor: this.$store.state.home.$tcolor,
      cor: "1", //当前第几页
      der: "10", //每页多少条
      user: [],
      arr: [],
      url: "http://8.136.181.16/",
      sum: 10,
      load: true,
    };
  },
  onLoad() {
    this.call();//页面加载是调用宠物圈列表方法
  },
  onShow() {},
  onPullDownRefresh() { //下拉刷新
		this.cor = "1";
		this.der = "10";
		this.load = true;
    crcle({
      curPage: this.cor,
      pageSize: this.der,
    }).then((res) => {
      // console.log(res.data.data)
      this.user = res.data.data;
    });
  },
  // 触底
  onReachBottom() {
    if (this.load) {
      this.cor++;
      this.call();
    } else {
      uni.showToast({
        title: "没有数据",
        icon: "none",
      });
    }
  },
  methods: {
    qqq() {
      console.log(this.show);
    },
    cao() {
      this.show = 1;
    },
    // 底部加载方法
    call() {
      crcle({ //获取宠物圈列表
        curPage: this.cor,
        pageSize: this.der,
      }).then((res) => {
        if (res.data.data.length === 0) {
          this.load = false;
          uni.showToast({
            title: "没有数据了",
            icon: "none",
          });
          return;
        }
        this.user = [...this.user, ...res.data.data];
        console.log(this.user);
        // this.user =res.data.data
        // console.log(typeof( res.data.data.length))
      });
    },

    beforeSwitch(index) {
      //切换前回调 true 允许 false不允许 详见 https://uviewui.com/components/tabbar.html
      // console.log(index)
      return true;
    },
  //调用预览图片的方法
    getImgIndex(index, ind) {
      console.log(index, ind);

      //准备一个装图片路径的  数组imgs

      let imgs = this.user[ind].DuaminImg.map((item) => {
        //只返回图片路径
        return this.url + item.content;
      });
      console.log(imgs);
      uni.previewImage({
        urls: imgs,
        current: index,
      });

    
    },
    go() {

			if (uni.getStorageSync("UserInfo")) {
			  //本地存在用户数据
			  // this.getUserInfoFlagFun();
			  console.warn("首页:\n已有数据不需要请求\n直接进入页面");
			  uni.navigateTo({
			    url: "../y-petCrcle-Publish/index",
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
    To(i) {
      let user = encodeURIComponent(JSON.stringify(this.user[i]));

      uni.navigateTo({
        url: "../y-petCrcle-comments/index?id=" + user,
        // url: '../y-petCrcle-Publish?id=' + user
        // url: '../comments/comments?id=1'
      });
    },
    ...mapActions("home", ["userLogin"]), //异步登录退出
    // ...mapMutations("home", ["userLogin"]), //登录退出
    ...mapMutations("home", {
      //防止多次点击
      // getUserInfoFlagFun: "getUserInfoFlag",
    }),
  },
};
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.PetCircle {
  width: 100%;
  padding: 30rpx 10rpx;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 1px 1px 6px #ccc;
}

.Pet_user {
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0 20rpx;
}

.Pet_user image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 100%;
  margin-right: 30rpx;
}

.name {
  font-size: $uni-font-size-base;
  font-weight: bolder;
}

.user-f {
  font-size: $uni-font-size-sm;
  font-weight: normal;
  margin-top: 10rpx;
  color: $uni-text-color-grey;
}

.Pet_title {
  width: 100%;
}

.Pet_title text {
  color: $uni-color-paragraph;
  font-size: $uni-font-size-paragraph;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.Pet_img {
  width: 100%;
  display: flex;
  // justify-content: center;
  flex-wrap: wrap;
  height: auto;
}

.P_main {
  width: 33%;
  height: auto;
  padding: 5rpx;
}

.P_main image {
  width: 100%;
  height: 250rpx;
}

.Pet_icon {
  width: 100%;
  display: flex;
  justify-content:space-between;
  // align-items: center;
  // text-align: right;
  padding: 30rpx 50rpx 0 15rpx;
}

.Publish {
  width: 80rpx;
  height: 80rpx;
  background-color: #ccc;
  border-radius: 100%;
  position: fixed;
  right: 10rpx;
  bottom: 20%;
  line-height: 80rpx;
  text-align: center;
}
.city{
  font-size:$uni-font20 ;
  color:$uni-color-light;
}
</style>
