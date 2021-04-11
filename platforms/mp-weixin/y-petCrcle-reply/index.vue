<template>
  <view class="content">
    <view class="pD" style="background: #fff">
      <view class="c_name">
        <!-- 头像 -->
        <image class="c_m_img" :src="commentData.img" mode=""></image>
        <!-- 用户ID -->
        <view class="avatar">
          <!-- ID -->
          <view class="detail">
            <text>{{ commentData.usernmae }}</text>
            <view class="fot-s">{{ commentData.CommentTime }}</view>
          </view>
          <view class="c_nr mT">{{ commentData.CommentContent }}</view>
          <!-- 回复 -->
          <!-- <view class="huifu">118条回复 ></view> -->
        </view>
      </view>
			      <view class="Pet_icon">
        <u-icon
          label="评论"
          @click="Comm"
          label-size="26"
          size="45"
          name="chat"
        ></u-icon>
      </view>
    </view>
    <!-- 总评论 -->
    <view class="c_mian pD">
      <view>回复详情</view>
      <view
        class="c_name"
        v-for="(item, index) in details"
        :key="index"
        @tap="PopUp(index)"
      >
        <!-- 头像 -->
        <image class="c_m_img" :src="item.img" mode=""></image>
        <!-- 用户ID -->
        <view class="avatar">
          <!-- ID -->
          <view class="detail">
            <text>{{ item.usernmae }}</text>
            <text class="fot-s mR">{{ item.CommentTime }}</text>
          </view>
          <view class="c_nr mT">{{ item.CommentContent }}</view>
          <!-- 回复 -->
          <view class="huifu">回复</view>
        </view>
      </view>

      <!-- 回复 -->
      <view class="c_name"  v-for="(ite,ind) in replyData " :key="ind"  >
        <!-- 头像 -->
        <image class="c_m_img" :src="ite.img" mode=""></image>
        <!-- 用户ID -->
        <view class="avatar" @tap="carryOn(ind)">
          <!-- ID -->
          <view class="detail">
            <text>{{ite.usernmae}}</text>
            <text class="fot-s mR">{{ite.CommentTime}}</text>
          </view>
          <view class="c_nr mT">{{ite.CommentContent}}</view>
          <!-- 回复 -->
          <view class="r-hui">
            <view class="stick"></view>
            <view class="r-zhe">
              <text class="clo">{{ite.replyIdname}} :</text
              ><text class="contt"
                >{{ite.reContent}}</text
              >
            </view>
          </view>

          <view class="huifu">回复</view>
        </view>
      </view>
    </view>

    <!-- 底部评论 -->
    <view class="bt_pl">
      <view class="inpt">
        <input
          type="text"
          :focus="showPopupBottom"
          @confirm="goLogin"
          placeholder="评论:"
          v-model="content"
          v-show="focu"
        />
        <input
          type="text"
          :focus="reply"
          v-show="!focu"
          @confirm="goLogin"
          :placeholder="'回复' + name"
          v-model="content"
        />
        <button type="default" @click="send">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
import {thisreply, reply, commentSon } from "@/store/mp-weixin/Weapp-User-Api.js";
export default {
  data() {
    return {
      commentData: [], // 当前的主评论者
      id: "", // 用户ID
      CommentId: "", //评论ID
      DunamicId: "", //动态ID
      content: "", //  发表内容
      cont: "", // 回复内容
      replyId: "1", //回复ID
      showPopupBottom: false, //input聚焦
      details: [], //评论详情
      focu: true, // input 显示隐藏
      name: "", //回复的名字
      reply: false, // 回复聚焦
			replyData:[], //回去回复的数组
			reContent:'', //回复者的内容
    };
  },
  onLoad(option) {
    // console.log(option);
    let commentData = JSON.parse(decodeURIComponent(option.id));
    this.commentData = commentData;
    console.log(this.commentData);
    this.DunamicId = commentData.DunamicId;
    this.CommentId = commentData.CommentId;

    this.list();
		this.obtain()
  },
  // 获取用户信息
  mounted() {
    let _this = this;
    uni.getStorage({
      key: "UserInfo",
      success: function (res) {
        console.log(res.data);
        _this.id = res.data.id;
        // _this.name = res.data.usernmae
      },
    });
  },

  methods: {
    // 调用接口的方法
    comt() {
      reply({
        id: this.id, //评论ID
        // id:this.id , //用户ID
        discussid: this.CommentId,
        DunamicId: this.DunamicId, //动态ID
        CommentContent: this.content, //评论内容
        replyId: this.replyId, //回复ID
      }).then((res) => {
        // console.log(res)
        this.list();
				this.obtain()
        this.content = "";
      });
    },
    // 获取回复的接口
    obtain() {
			thisreply({
				discussid:this.CommentId,
			}).then(res=>{
				// console.log(res.data.data);

				this.replyData = res.data.data
				 this.replyData.forEach(ele => {
				 ele.reContent = ele.CommentContent
				 console.log(ele.reContent);
			});  
				console.log(this.replyData);
			})
			

		},

    // 发表评论
    send() {
      // console.log(this.content)
      // console.log(this.replyId);
      // console.log(this.CommentId)
		  //  this.replyData.forEach(ele => {
			// 	 ele.reContent = ele.CommentContent
			// 	 console.log(ele.reContent);
			// });  

      if (this.content == "") {
        uni.showToast({
          title: "请输入评论内容!",
          icon: "none",
        });
        console.log(this.replyId);
      } else if (this.replyId == this.id) {
        this.replyId = "1";
      } else {
        this.comt();
        this.focu = true;
        this.replyId = "1";
      }
    },
    // 进入评论详情方法
    PopUp(i) {
      console.log(this.details[i]);
      this.replyId = this.details[i].id;
      this.name = this.details[i].usernmae;
      // console.log(this.replyId);
      // console.log(this.id);
      if (this.replyId == this.id) {
        this.focu = true;
        this.showPopupBottom = true;
        this.replyId = "1";
        this.reply = false;
      } else {
        this.showPopupBottom = false;
        this.focu = false;
        this.reply = true;
      }
      // console.log(this.focu);
    },
		// 回复的回复
		carryOn(i){
			console.log(this.replyData[i]);
			 this.replyId = this.replyData[i].id;
      this.name = this.replyData[i].usernmae;
			      if (this.replyId == this.id) {
        this.focu = true;
        this.showPopupBottom = true;
        this.replyId = "1";
        this.reply = false;
      } else {
        this.showPopupBottom = false;
        this.focu = false;
        this.reply = true;
      }
		},
    // 点击图片弹出评论
    Comm() {
      this.showPopupBottom = true;
			this.focu = true
    },
    // 回车的按钮发送
    goLogin() {
      // console.log("123123");
      this.send();
    },
    //  获取评论列表的方法
    list() {
      commentSon({
        discussid: this.CommentId,
      }).then((res) => {
        // console.log(res);
        // res.data.data.forEach(el=>{

        // 		 if(el.replyIdname == null){
        // 			 el.replyIdname = ''

        // 		 }
        // 		  console.log(el.replyIdname);
        // 	 })
        this.details = res.data.data;
      });
    },
  },
};
</script>
<style >
page {
  background-color: #f5f5f5;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.Pet_icon {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  // align-items: center;
  // text-align: right;
  padding: 15px 20px 0;
}
.c_mian {
  width: 100%;
  // padding: ;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;
}
.c_name {
  width: 100%;
  color: $uni-text-color-grey;
  margin-top: 30rpx;
  display: flex;
  font-size: $uni-font-size-sm;
  margin-bottom: 50rpx;
}

// .c_name text {
// 	color: $uni-text-color-dark;
// 	// font-weight: bold;
// 	font-size:$uni-font-size-sm ;
// }

.c_nr {
  width: 100%;
  color: $uni-text-color;
  overflow: hidden;
  font-size: $uni-font-size-base;
}

.bt_pl {
  width: 100%;
  position: fixed;
  bottom: 0;
  box-shadow: 2rpx 2rpx 10rpx #ccc;
  background-color: #fff;
}
.detail .fot-s {
  color: $uni-text-color-grey;
  font-size: $uni-font20;
}
.avatar {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.c_m_img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  margin-right: 20rpx;
}
.detail {
  flex: 1;
}
.detail text {
  color: $uni-text-color-dark;
  // font-weight: bold;
  line-height: 30rpx;
  font-size: $uni-font-size-sm;
}
.huifu {
  padding: 4rpx 20rpx;
  font-size: $uni-font20;
  color: $uni-text-color;
  background: #f5f5f5;
  border-radius: 40rpx;
  margin-top: 20rpx;
}
.bt_pl {
  width: 100%;
  position: fixed;
  bottom: 0;
  box-shadow: 2rpx 2rpx 10rpx #ccc;
  background-color: #fff;
}
.inpt {
  width: 100%;
  padding: 30rpx;
  background-color: #fff;
  display: flex;
}

.inpt input {
  width: 80%;
  height: 60rpx;
  background-color: #f5f5f5;
  border-radius: 10px;
  line-height: 60rpx;
  padding: 0 20rpx;
}

.inpt button {
  width: 20%;
  line-height: 60rpx;
  // border: none !important;
  background-color: #fff;
  font-size: 30rpx;
  color: #666;
}

.inpt button::after {
  border: none !important;
}
.stick {
  width: 4rpx;
  height: 34rpx;
  background: #ccc;
  margin-right: 10rpx;
}
.r-hui {
  margin-top: 20rpx;
  width: 100%;
  display: flex;
}
.r-zhe {
  flex: 1;
}
.contt {
  color: $uni-text-color;
  // font-weight: bold;
  line-height: 34rpx;
  font-size: $uni-font-size-sm;
}
.clo {
  color: $uni-color-primary;
  // font-weight: bold;
  line-height: 34rpx;
  font-size: $uni-font-size-sm;
  margin-right: 8rpx;
}
</style>
