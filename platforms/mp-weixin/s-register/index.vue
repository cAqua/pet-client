<template>
  <view class="form">
    <u-form
      :model="form"
      ref="uForm"
      label-position="left"
      label-align="center"
      label-width="175rpx"
    >
      <!-- 用户名 -->

      <u-form-item
        label="用户名"
        prop="username"
      >
        <u-input v-model="form.username" />
      </u-form-item>

      <!-- 密码 -->
      <u-form-item
        label="密码"
        prop="password"
      >
        <u-input v-model="form.password" />
      </u-form-item>
      <!-- <u-form-item label="确认密码" prop="password"><u-input v-model="form.password"  /></u-form-item> -->
      <!-- 电话号码 -->
      <u-form-item
        label='电话号码'
        prop="phoneNumber"
      >
        <u-input v-model="form.phoneNumber"></u-input>
      </u-form-item>

      <!-- 店铺图片 ---------------------------------------------------------->
      <u-form-item label="店铺图片">
        <u-upload
          max-count='1'
          ref="shopPicture"
          :form-data="newform"
          :action="action"
          :auto-upload="false"
          :before-upload="beforeUpload"
        ></u-upload>
      </u-form-item>

      <!-- 店铺名称 -->
      <u-form-item
        label='店铺名称'
        prop="shopName"
      >
        <u-input v-model="form.shopName"></u-input>
      </u-form-item>

      <!-- 地区 -->
      <u-form-item label='选择地区'>
        <view @click="areaStatus = true">{{area}}</view>
        <u-picker
          mode='region'
          :default-region='["广东省", "广州市", "天河区"]'
          v-model="areaStatus"
          @confirm=areaClick()
        ></u-picker>
      </u-form-item>

      <!-- 详细地址 -->
      <u-form-item
        label='详细地址'
        prop="DetailedAddress"
      >
        <u-input
          type='textarea'
          v-model="form.DetailedAddress"
        ></u-input>
      </u-form-item>

      <!-- 店铺介绍 -->
      <u-form-item
        label='店铺简介'
        prop="ShopIntroduction"
      >
        <u-input
          type='textarea'
          v-model="form.ShopIntroduction"
        ></u-input>
      </u-form-item>

      <!-- 经营时间 -->
      <u-form-item
        label='经营时间'
        prop="StoreTime"
      >
        <u-input v-model="form.StoreTime"></u-input>
      </u-form-item>

      <!-- 经营项目 -->
      <u-form-item
        label="经营项目"
        prop="Storemanage"
      >
        <u-checkbox-group>
          <u-checkbox
            v-model="item.checked"
            v-for="(item, index) in form.Storemanage"
            :key="index"
            :name="item.name"
          >
            {{ item.name }}
          </u-checkbox>
        </u-checkbox-group>
      </u-form-item>

      <u-button
        type="primary"
        @click='submit()'
      >提交</u-button>

    </u-form>

    <u-top-tips ref="uTips"></u-top-tips>

  </view>
</template>

<script>
import {merchantRegistered} from '@/store/mp-weixin/Weapp-Merchant-Api.js'
export default {
  data() {
    return {
			area:'省份、市、地区、', //默认地区
			areaStatus:false, // 地区选择打开
			userInfo:{},
      form: {
        username: '', //用户名 值
        password: '18676854158', //密码 值
        phoneNumber: '18676854158', //手机号 值
        shopName: '柴柴宠物店', //店铺名 值
        DetailedAddress: '广东省广州市天河区珠村牌坊1号街', //详细地址 值
        ShopIntroduction: '此店铺非常厉害', //店铺介绍 值
        StoreTime: '8:00~18:00', //经营时间 值
				Storemanage: [ //经营项目 值
        {
          name: '洗澡',
          checked: false,
          disabled: false,
        },
        {
          name: '理发',
          checked: false,
          disabled: false,
        },
        {
          name: '疫苗',
          checked: false,
          disabled: false,
        },
				{
          name: '日常护理',
          checked: false,
          disabled: false,
        },
				{
          name: '玩具',
          checked: false,
          disabled: false,
        },
      ],
      },
      rules: { //各项匹配规则
        username: [ //用户名 
          { 
            required: true,
            message: '此为必填字段',
            trigger: 'blur',
          },
					{
						max:10,
						message:'长度不能大于10',
						trigger:['blur','change']
					}
        ],
        password: [  //密码
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
					{ //自定义密码规则
						validator:(rule,value,callback)=>{
							
							return this.$u.test.enOrNum(value) && this.$u.test.rangeLength(value, [0, 15])
						},
						message:'密码只能包括字母跟数字且长度小于15',
						trigger:['change','blur'],
					}
        ],
        phoneNumber: [ //手机号
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
					{ //自定义密码规则
						validator:(rule,value,callback)=>{
							
							return this.$u.test.mobile(value)
						},
						message:'请输入正确的手机号码',
						trigger:['blur','change'],
					}
        ],
        shopName: [ //店铺名称
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
					{ //自定义店铺名称
						validator:(rule,value,callback)=>{
							
							return this.$u.test.chinese(value) && this.$u.test.rangeLength(value, [0, 10])
						},
						message:'店铺名只能是中文,且在10个文字以内',
						trigger:['blur'],
					}
        ],
        DetailedAddress: [  //详细地址
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },

        ],
				ShopIntroduction: [ //店铺简介
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
					{
						max:150,
						message:'店铺介绍字数不能大于150',
						trigger:'change'
					}
        ],
        StoreTime: [ //营业时间
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
        ],
				Storemanage:[
          //           {
          //   required: true,
          //   message: '此为必填字段',
          //   // blur和change事件触发检验
          //   trigger: 'blur',
          // },
					// {
             //自定义店铺名称
					// 	validator:(rule,value,callback)=>{
					// 		return value.length <= 2
					// 	},
					// 	message:'店铺名只能是中文,且在10个文字以内',
					// 	trigger:['blur'],
					// }
				],



      },
      action: "http://8.136.181.16/api/insertStorte", //服务器地址
      // imglist:'',
      newform:{},
    }
		
		
  },
	onReady() {
		this.$refs.uForm.setRules(this.rules)
		
	},
	onLoad(){

		uni.$on('businessRegistration',function(i){
			
			// this.userInfo = i

			
		})

    this.userInfo = {
				usernmae: "Minato", 
				id: "osS0G5lXrmWZ9lM3WMvejFFf4Y78", 
				img: "https://thirdwx.qlogo.cn/mmopen/vi_32/gqpgq8OicaDP…GqKHicGBjLzZZRmib7jgyMabqKZ7NovUW4HP00Kcq0qvw/132",
				place: "Guangdong-Guangzhou",
				source: "weixin",
				UserType: "merchant"
    }
			this.form.username = this.userInfo.usernmae;


	},

	methods:{
    beforeUpload(index, list) {
				// 返回一个promise
        // let form = this.newform;
        // let files = this.$refs.shopPicture.lists;

        return

				return new Promise((resolve, reject) => {

          uni.request({
            url:'http://8.136.181.16/api/insertStorte',
            method:'POST',
            header: {
              'content-type': 'application/json; charset=utf-8'
            },
            data:this.newform,
            success:(res)=>{
              console.log(res);
            },
            fail:(err)=>{
              console.log(err);
            }
          })
          
          
				})
			},
	 submit() {
		 	 


        let ManageList=[], //选中的项目
            formStatus = Boolean;//表单验证状态

        this.form.Storemanage.forEach(i => { //循环出 选中的项目
          if(i.checked === true){
            ManageList.push({
              icon:i.name,
            })
          }
        }); //验证复选框 选中数量

        if(ManageList.length < 2){//复选框验证 规则

          return this.$refs.uTips.show({
            title: '最少选择2个经营项目',
            type: 'error',
            duration: '2300'
          }) 
        }
       
        this.$refs.uForm.validate(valid => { //表单验证规则
          valid ? true : false;
        })
        .then(res => {
          formStatus = true
        })
        .catch(err =>{console.log(err)})




        if(ManageList && formStatus){  //表单验证是否通过

          let i = this.userInfo,//获取的商家信息
              f = this.form;// 填写的店铺信息

          this.newform = {
            id:i.id, //唯一id
            usernmae:f.username, //用户名
            password:f.password,//密码
            img:i.img, //头像
            place:i.place,//地理位置
            source:i.source,//来源
            StoreImage: '23333',//店铺图片
            DetailedAddress:f.DetailedAddress, //详细地址
            ShopName:f.shopName,//店铺名称
            ShopIntroduction:f.ShopIntroduction,//店铺介绍
            phoneNumber:f.phoneNumber,//手机号码
            StoreTime:f.StoreTime,//运营时间
            Storemanage:JSON.stringify(ManageList),
            UserType:'merchant',
          }

        let newFilename = newDate.getTime() + '.' + file.name.split('.')[1];


        // this.$refs.shopPicture.lists.filter(val => {
				// 		this.newform.StoreImage  = val.url
				// })



				
				console.log(this.newform);


				this.$refs.shopPicture.upload();

        // // console.log(this.newform);

        //   merchantRegistered(this.newform)
				// 	.then(res =>{

        //       console.log(res);

        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })

          
        }
    },

		areaClick(e){ //地区状态
			let area = '';
			for (const key in e) {
				area += e[key].label;
			}
			this.form.DetailedAddress = this.area = area;
		},

      onErr(i){ 
        console.log(i);
       },
      onuploadeid(){
        console.log(i);
       },
      onPro(i){ 
        console.log(i);
       },
      onSuccess(i){ 
        console.log(i);
       },
	},

}
</script>

<style scoped lang="scss">
form {
  width: 100vw;
  height: 100vw;
  margin: 10rpx 20rpx;
}
</style>
