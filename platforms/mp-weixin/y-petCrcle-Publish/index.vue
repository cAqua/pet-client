<template>
	<view class="content">
		<view class="load">
			<button @click="submit">发表</button>
		</view>
		<textarea class="tar" v-model="from.DuamincContent" placeholder="记录每一刻~" />
		<u-upload
      ref="uUpload"
      :form-data="from"
      :action="action"
      @on-error="onErr"
      @on-uploaded="onuploaded"
      :auto-upload="false"
      @on-progress="onPro"
      @on-success="onSuccess"
    ></u-upload>
  </view>
</template>
<script>
import { dunamic } from "@/store/mp-weixin/Weapp-User-Api.js";
export default {
  data() {
    return {
      // 服务器地址
      action: "http://8.136.181.16/api/fliename",
      // load:true, //隐藏上传进度条
      from: {
        id: "",
        DuamincContent: "",
        fliename: "",
      },
      filesArr: [], // 存放上传图片的数组
			usernmae:'', //用户名
			img:'', //用户头像
			place:'', //地区
			
    };
  },
  onLoad() {},
  // 上传中
  mounted() {
    let _this = this;
    let fliename = `${new Date().getTime()}-${Math.random()
      .toString(36)
      .substr(2)}`; //生成文件夹名字
    _this.from.fliename = fliename;
    uni.getStorage({
      key: "UserInfo",
      success: function (res) {
				console.log(res)
        _this.from.id = res.data.id;
        _this.usernmae = res.data.usernmae;
        _this.img = res.data.img;
        _this.place = res.data.place;
				
      },
    });
  },
  methods: {
		// 发表的方法
		upload(){
			dunamic({
			  id: this.from.id,    //上传的参数
			  DuamincContent: this.from.DuamincContent,//上传的参数
			  fliename: this.from.fliename,//上传的参数
			}).then((res) => {
				console.log(res.data.data[0].DuaminImg)
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.otherFun({
					DuaminImg:res.data.data[0].DuaminImg,
					DuaminTime:res.data.data[0].DuaminTime,
					DuamincContent:res.data.data[0].DuamincContent,
					DunamicId:res.data.data[0].DunamicId,
					img:this.img,
					num:'0',
					place:this.place,
					usernmae:this.usernmae
				});   //修改上一页data里面的searchVal参数值为1211
			  uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
			   delta: 1
			      });
			})
			
			},
    submit() {
      let file = [];
      this.$refs.uUpload.lists.forEach((el) => {
        file.push(el.url); //上传的所以图片添加到file
      });
      this.filesArr = file;//上传的所以图片添加到filesArr
      // console.log(this.filesArr);
      if (this.from.DuamincContent != "" && this.filesArr == "") { // 判断是否有图片上传
           this.upload()
				

      } else if (this.from.DuamincContent != "") {
        this.$refs.uUpload.upload();
      } else {
        uni.showToast({
          title: "请填写内容",
          icon: "none",
          mask: true,
          duration: 1000,
        });
      }
    },
    onuploaded(lists, name) {
      // 全部图片上传完后触发
       this.upload()
        // uni.navigateBack({
        //   delta: 1,
        // });
    },
    onPro() {
      uni.showLoading({
        title: " 发表中...",
        mask: true,
        duration: 100000,
      });
      console.log("上传中");
    },
    // 发表成功跳转页面
    onSuccess(index, list) {},
    onErr() {
      uni.showToast({
        title: "上传失败",
        icon: "none",
        mask: true,
        duration: 1000,
      });
    },
  },

};
</script>
<style>
/* 	page{
		background-color: #f5f5f5;
	} */
</style>
<style lang="scss" scoped>
.load {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 20rpx;
  // background-color: #FFFFFF;
}

.load button {
  background-color: $uni-color-success;
  margin: 0 30rpx 0 0;
  font-size: $uni-font-size-sm;
  color: #fff;
  // padding: 0;
	width: 18%;
  height: 60rpx;
}
							
.tar {
  width: 100%;
  padding: 10rpx 0 20rpx 30rpx;
  font-weight: 500;
  background-color: #f5f5f5;
  margin:0 auto;
}
</style>
