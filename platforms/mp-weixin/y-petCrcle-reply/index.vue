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
			<view class="c_name" v-for="(item, index) in details" :key="index">
				<!-- 头像 -->
				<image class="c_m_img" :src="item.img" mode=""></image>
				<!-- 用户ID -->
				<view class="avatar">
					<!-- ID -->
					<view class="detail" @tap="PopUp(item)">
						<text>{{ item.usernmae }}</text>
						<text class="fot-s mR">{{ item.CommentTime }}</text>
						<!-- <view class="huifu">回复</view> -->
					</view>
					<view class="c_nr mT" @tap="PopUp(item)">{{ item.CommentContent }}</view>
					<!-- dataSon -->
					<view v-if='item.dataSon.length!=0'>
						<view class="c_name" v-for="(ite,ind) in item.dataSon " :key="ind" @click="pupu(item,ite)">
							<!-- 头像 -->
							<image class="c_m_img" :src="ite.img" mode=""></image>
							<!-- 用户ID -->
							<view class="avatar">
								<!-- ID -->
								<view class="detail">
									<text>{{ite.usernmae}}</text>
									<text class="fot-s mR">{{ite.CommentTime}}</text>
								</view>
								<!-- 回复 -->
								<view class="r-hui">
									<view class="r-zhe">
										<text class="clo"> <text class="contt">回复 </text>{{ite.replyIdname}} :</text>
										<text class="contt">{{ite.CommentContent}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部评论 -->
		<view class="bt_pl">
			<view class="inpt">
				<input type="text" @confirm="enter" :focus="focus" placeholder="评论:" v-model="content" v-show="commentfun" />
				<input type="text" @confirm="enter" :focus="refocus" :placeholder="'回复:'+ usernmae" v-model="content" v-show="replyIdfunc" />
				<button type="default" @click="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		thisreply,
		reply,
		commentSon
	} from "@/store/mp-weixin/Weapp-User-Api.js";
	export default {
		data() {
			return {
				commentData: [], // 当前的主评论者
				id: "", // 用户当前ID
				content: "", //  当前评论内容
				commentfun: true, //评论输入框
				replyIdfunc: false, //回复输入框
				details: [], //评论详情列表
				usernmae: "", //回复的名字
				replyId: '', //回复ID
				discussid: '' ,//当前评论的id
				focus:false, //评论聚焦
				refocus:false, //回复聚焦
			};
		},
		onLoad(option) { //页面跳转传过来的值
			this.commentData = JSON.parse(decodeURIComponent(option.id));
			console.log(this.commentData)
		},
		// 获取用户信息
		mounted() {
			let _this = this;
			uni.getStorage({
				key: "UserInfo",
				success: function(res) {
					_this.id = res.data.id;
				},
			});
			this.selectcommentSon();
		},
		methods: {
			send() { //发送
				let that = this;
				if (that.content == '') {
					uni.showToast({
						title: "请输入内容!",
						icon: "none",
					});
					return false;
				}
				this.ThatReply();
			},
			// 点击图片弹出评论
			Comm() {
			  this.commentfun = true;
				this.replyIdfunc = false
				this.focus = true;
				console.log(this.focus)
			},
			// 回车发送
			enter(){
				this.send()
			},
			pupu(item,ite){ //回复的回复
			this.refocus = true;
				if (ite.id == this.id) { //判断当前用户是否要评论自己
					this.commentfun = false; //评论输入框
					this.replyIdfunc = true; //回复输入框
					this.usernmae = item.usernmae;
					this.replyId = item.id;
					this.discussid = item.CommentId;
				} else {
					this.commentfun = false; //评论输入框
					this.replyIdfunc = true; //回复输入框
					this.usernmae = ite.usernmae;
					this.replyId = ite.id;
					this.discussid = item.CommentId;
				}
			},
			ThatReply() { //评论接口
				if (this.commentfun == true) { //点击当评论是自己的默认是评论
					reply({
						id: this.id, //当前评论用户id
						discussid: this.commentData.CommentId, //当前评论id
						DunamicId: this.commentData.DunamicId, //当前评论动态ID
						CommentContent: this.content, //当前评论内容
						replyId: '1' //回复id
					}).then((res) => {
						this.refocus = false;
						this.focus = false;
						console.log(this.commentData.CommentId)
						this.content = '';
						this.selectcommentSon();
					})
				} else {
					reply({
						id: this.id, //当前评论用户id
						discussid: this.discussid, //当前评论id
						DunamicId: this.commentData.DunamicId, //当前评论动态ID
						CommentContent: this.content, //当前评论内容
						replyId: this.replyId //回复id
					}).then((res) => {
						console.log(this.discussid,)
						this.content = '';
						this.commentfun = true; //评论输入框
						this.replyIdfunc = false; //回复输入框
						this.selectcommentSon();
						this.refocus = false;
						this.focus = false;
					})
				}

			},
			selectcommentSon() { //查询当前评论列表
				commentSon({
					discussid: this.commentData.CommentId, //当前评论id
					DunamicId: this.commentData.DunamicId //当前评论的动态id
				}).then((res) => {
					this.details = res.data.data;
				})
			},
			PopUp(items) { //点击当前评论
				if (items.id !== this.id) { //判断当前用户是否要评论自己
					this.commentfun = false; //评论输入框
					this.replyIdfunc = true; //回复输入框
					this.usernmae = items.usernmae;
					this.replyId = items.id;
					this.discussid = items.CommentId;
					this.refocus = true;
				} else {
					this.commentfun = true; //评论输入框
					this.replyIdfunc = false; //回复输入框
					this.focus = true
				}
			}

		},
	};
</script>
<style>
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
