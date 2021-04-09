<template >

	<view class="content" >
		<view class="PetCircle" >

			<!-- 用户信息 -->
			<view class="Pet_user">
				<image :src="user.img" mode=""></image>
				<view class="name">
					{{user.usernmae}}
					<view class="user-f">
						{{user.DuaminTime}}
					</view>
				</view>
			</view>
			<!-- 标题 -->
			<view class="Pet_title pD">
				<text>
					{{user.DuamincContent}}
				</text>
			</view>
			<!-- 内容 -->
			<view class="Pet_img">
				<view v-for="(item,index) in user.DuaminImg" :key="index" class="P_main">
						<u-lazy-load height="250" img-mode="aspectFill" :image="url+item.content" 
					:loading-img="loadingImg" :error-img="errorImg" @click="getImgIndex(index,ind)"></u-lazy-load>

				</view>

			</view>
			<view class="Pet_icon ">

				<u-icon label="评论"  @click="Comm"  label-size="26" size="45"  name="chat"></u-icon>

			</view>
		</view>
		<!-- <u-gap height="20" bg-color="#f5f5f5"></u-gap> -->
		<!-- 评论 -->
<view class="" style="flex: 1;">
		<view class="comments">
			评论列表
		</view>
		<!-- 总体评论 -->
		<view class="c_mian pD">
			<view class="c_name" v-for="(ite,ide) in commentData" :key="ide"  @tap="PopUp(ide)">
				<!-- 用户ID -->
				<view class="avatar">
					<!-- 头像 -->
					<image src="{{ite.img}}" mode=""></image>
					<!-- ID -->
				<view class="detail">					
				<text>{{ite.usernmae}}</text> 回复 : <text>{{ite.replyIdname}}</text>
				<view class="fot-s">{{ite.CommentTime}}</view>
				</view>
				<!-- 回复 -->
				<view class="huifu">回复</view>
				</view>
				<view class="c_nr">{{ite.CommentContent}}</view>
			</view>

		</view>

	




</view>
	<!-- 底部评论 -->
	<view class="bt_pl">
		<view class="inpt">
			<input type="text" :focus="showPopupBottom" @confirm="goLogin"  v-show="focu"  placeholder="评论:" v-model="content"  />
				<input type="text" :focus="reply" v-show="!focu"  @confirm="goLogin"  :placeholder="'回复'+name" v-model="content" />
			<button type="default" @click="send">发送</button>
		</view>
	</view>
	</view>
</template>

<script>
	import { comment,commentList } from '@/store/mp-weixin/Weapp-User-Api.js';
import uSearchVue from '../../../UI/uView/components/u-search/u-search.vue';
	export default {
		data() {
			return {
				open: false,
				bg: false,
				user: [],
				CommentId:'', //评论ID
				DunamicId:'' , //动态ID
				content:'', //  发表内容
				cont:'', // 回复内容
				replyId:'', //回复ID
				url: 'http://8.136.181.16/',
				commentData:[], // 评论列表
				name:'',  // 当前名字
				focu:true, // input 显示隐藏
				showPopupBottom: false, //input聚焦
				reply: false, //回复聚焦
				yes:true, //有回复是显示

			}
		},
			onLoad(option) {
				// console.log("已加载就触发9999");
				// console.log(option.id)
				// console.log(JSON.parse(decodeURIComponent(option.id)));
				let user = JSON.parse(decodeURIComponent(option.id));
				// console.log(uSearchVue)
				// this.+(this.name,[],user)
				console.log(this.commentData)
				this.user = user
				this.DunamicId = user.DunamicId
				this.list()
			},
			mounted(){
					let _this = this
	    uni.getStorage({
			    key: 'UserInfo',
			    success: function (res) {
						console.log(res.data.usernmae);
						_this.CommentId = res.data.id
						// _this.name = res.data.usernmae
			    }
			});
			},
		methods: {
			// 点击图片弹出评论
			Comm(){
					this.focu = true;
					this.showPopupBottom = true;
					this.reply = false;
			},

			// 回复信息方法
			 PopUp(i){
				
				this.replyId = this.commentData[i].id
				
				
				this.name = this.commentData[i].usernmae
				if(this.replyId == this.CommentId ){
					this.focu = true
					this.showPopupBottom = true;
					this.reply = false
				}else{
					this.showPopupBottom = false;
					this.focu = false
					this.reply = true
				}
				// console.log(this.replyId)
			},

			//  获取评论列表的方法
			list(){
					commentList({
						DunamicId:this.DunamicId
					}).then(res=>{
						console.log(res.data.data);
			 	  res.data.data.forEach(el=>{
					    
							 if(el.replyIdname == null){
								 el.replyIdname = ''
								
							 }
							  console.log(el.replyIdname);
						 })
								this.commentData = res.data.data
					})
			},



			// 调用接口的方法
			comt(){
				comment({
					CommentId:this.CommentId   ,//评论ID
					// id:this.id , //用户ID
					DunamicId:this.DunamicId  , //动态ID
					CommentContent: this.content ,//评论内容
					replyId: this.replyId , //回复ID
				}).then(res =>{
					// console.log(res)
			    this.list()
					this.content = ''
				})
			},
			
			// 发表评论
			send(){
				// console.log(this.content)
					// console.log(this.replyId);
				// console.log(this.CommentId)
				if(this.content == ''){
						uni.showToast({
							title: "请输入评论内容!",
							icon: "none",
							
						});
						console.log(this.replyId);
				}else if(this.replyId == this.CommentId ){
					this.replyId = ''
				}else{
					this.comt()
				this.focu = true
				this.replyId = ''
				}
			},
			// 回车的按钮发送
			goLogin(){
				console.log('123123')
				this.send()
			},

			getImgIndex(index) {
				console.log(index);

				//准备一个装图片路径的  数组imgs

				let imgs = this.user.DuaminImg.map(item => {
					//只返回图片路径
					return this.url + item.content
				})
				console.log(imgs)
				uni.previewImage({
					urls: imgs,
					current: index,

				})
			},

			
		}
	}
</script>
<style>
	page {
height: 100%;
	}
</style>
<style lang="scss" scoped>
.content{
	min-height: 100%;
	display: flex;
	flex-direction: column;
}
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
		// display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 3;
		// overflow: hidden;
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
		justify-content: flex-end;
		// align-items: center;
		// text-align: right;
		padding: 15px 20px 0;
	}

	.comments {
		background-color: #fff;
		padding: 10rpx 30rpx;
		border-bottom: 1px solid #f5f5f5;
		border-top: 1px solid #f5f5f5;
		box-shadow: 1px 1px 6px #ccc;
		font-weight: bold;
		line-height: 50rpx;
	}

	.inpt {
		width: 100%;
		padding: 30rpx;

		display: flex;
	}

	.inpt input {
		width: 80%;
		height: 60rpx;
		background-color: #f5f5f5;
		border-radius: 20px;
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

	.c_mian {
		width: 100%;
		// padding: ;
		background-color: #fff;
		padding-bottom: 200rpx;
	}

	.c_name {
		width: 100%;
		color: $uni-text-color-grey;
		margin-bottom: 30rpx;
		font-size: $uni-font-size-sm;
	}

	.c_name text {
		color: $uni-color-primary;
		font-weight: bold;
		font-size:$uni-font-size-base ;
	}

	.c_nr {
		width: 100%;
		color: $uni-text-color;
		margin-top: 10rpx;
		overflow: hidden;
		font-size: $uni-font-size-base;
		padding-left: 100rpx;
	}

	.bt_pl {
		width: 100%;
		    position: fixed;
		    bottom: 0;
				box-shadow: 1px 1px 6px #ccc;
				background-color: #fff;
	}
	.fot-s {
		font-size: 22rpx;
	}
	.avatar{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
	}
	.avatar image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}
	.detail{
		flex: 1;
	}
	.huifu{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
</style>
