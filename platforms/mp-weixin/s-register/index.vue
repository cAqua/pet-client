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
        <u-input
          v-model="form.password"
          :type="passwordType"
        />
      </u-form-item>
      <u-form-item
        label="确认密码"
        prop="password1"
      >
        <u-input
          v-model="form.password1"
          :type="passwordType"
        />
      </u-form-item>
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
          ref="shopPicture"
          :before-upload="beforeUpload"
          :auto-upload="false"
          max-count='1'
          :show-progress="true"
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
        <u-checkbox-group width='50%'>
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

      <u-button type="primary" ripple-bg-color="#accaff" ripple="true" 
      :disabled='submitFlag' :loading='submitFlag'
      @click='submit()'
      >提交</u-button>

    </u-form>

    <u-top-tips ref="uTips"></u-top-tips> <!-- 顶部提示框 -->
    <u-toast ref="uToast" /> <!-- 消息提示 -->

  </view>
</template>

<script>
import {uploadMerchantInfo,IfmerchantName} from '@/store/mp-weixin/Weapp-Merchant-Api.js'
export default {
  data() {
    return {
			area:'省份、市、地区、', //默认地区
			areaStatus:false, // 地区选择打开
      merchantInfo:{}, //授权的用户信息
      passwordType:'password',
      submitFlag:false,//按钮是否可点击
      form: {   //表单的用户信息
        username: '', //用户名 值
        password: '', //密码 值
        password1: '', //密码 值
        phoneNumber: '', //手机号 值
        shopName: '', //店铺名 值
        DetailedAddress: '', //详细地址 值
        ShopIntroduction: '', //店铺介绍 值
        StoreTime: '', //经营时间 值
				Storemanage: [ //经营项目 值
        {
          name: '宠物洗澡',
          checked: false,
          disabled: false,
        },
        {
          name: '宠物理发',
          checked: false,
          disabled: false,
        },
        {
          name: '猫粮、狗粮',
          checked: false,
          disabled: false,
        },
        {
          name: '疫苗',
          checked: false,
          disabled: false,
        },
        {
          name: '宠物摄影',
          checked: false,
          disabled: false,
        },
        {
          name: '宠物护理',
          checked: false,
          disabled: false,
        },
        {
          name: '宠物玩具',
          checked: false,
          disabled: false,
        },
        {
          name: '日常用品',
          checked: false,
          disabled: false,
        },
        {
          name: '宠物寄养',
          checked: false,
          disabled: false,
        },
      

      ],
      },
      rules: { //表单验证匹配规则
        username: [ //用户名 
          { 
            required: true,
            message: '此为必填字段',
            trigger: 'blur',
          },
					{
						max:10,
						message:'长度不能大于10',
						trigger:['blur', 'change']
					},

          {  
            
           asyncValidator: (rule, value, callback) =>{
              
              try{

              IfmerchantName({usernmae:value})//异步验证 用户名是否能用
              .then(res => {
                
                if(res.data.desc === '用户名未注册'){
                  this.$refs.uTips.show({
                    title:'用户名可用',
                    type:'success',
                    duration:'1500'
                  })
                  callback()
                  // callback(new Error('用户名重复'))
                }else{
                  callback(new Error('用户名重复'))
                }
                
              })

              }catch(err){

                console.log(err);
                
              }
                
            },
            trigger:['blur']

          }
        ],
        password: [  //密码
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
          {
            min:5,
            max:15,
            message:'密码长度必须在5-15之间',
            trigger:['change','blur']
          },
					{ //自定义密码规则
						validator:(rule,value,callback)=>{
							return this.$u.test.enOrNum(value) && this.$u.test.rangeLength(value, [0, 15])
						},
						message:'密码只能包括字母跟数字且长度小于15',
						trigger:['change','blur'],
					}
        ],
        password1: [  //密码
          {
            required: true,
            message: '此为必填字段',
            // blur和change事件触发检验
            trigger: 'blur',
          },
					{ //自定义密码规则
						validator:(rule,value,callback)=>this.form.password === value,
						message:'俩次密码输入不一致',
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
						trigger:['blur','change'],
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
      
    }
		
		
  },
	onReady() {
		this.$refs.uForm.setRules(this.rules) //绑定 验证规则
	},
  onLoad(){

    uni.$once('merchantInfo', i =>{//用户授权的信息
      this.merchantInfo = i;
      this.form.username = i.usernmae;
		})

	},
	methods:{

	  submit(){
          
        if(this.$refs.shopPicture.lists.length === 0){ //是否上传了图片
          return this.$refs.uToast.show({
          title:'请上传店铺图片',
          type:'warning'
        })}

        let ManageList=[]; //复选框选中数量

        this.form.Storemanage.forEach(i => { //验证复选框 选中数量
          if(i.checked === true){
            ManageList.push({
              icon:i.name,
            })
          }
        }); 

        if(ManageList.length < 2){//复选框验证 规则
          return this.$refs.uTips.show({
            title: '最少选择2个经营项目',
            type: 'error',
            duration: '2300'
          }) 
        }
       
        this.$refs.uForm.validate(valid => { //验证表单状态
          valid ? true : false;
        })
        .then(res => {
          
          if(res){  //为true 验证通过
            let i = this.merchantInfo,//授权商家信息
                f = this.form,// 表单填写的店铺信息
                fileName = `${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;

            let thisMerchantInfo = {
                  id:i.id, //唯一id
                  usernmae:f.username, //用户名
                  password:f.password,//密码
                  img:i.img, //头像
                  place:i.place,//地理位置
                  source:i.source,//来源
                  StoreImage: fileName,//店铺图片 文件名
                  DetailedAddress:f.DetailedAddress, //详细地址
                  ShopName:f.shopName,//店铺名称
                  ShopIntroduction:f.ShopIntroduction,//店铺介绍
                  phoneNumber:f.phoneNumber,//手机号码
                  StoreTime:f.StoreTime,//运营时间
                  Storemanage:JSON.stringify(ManageList), // 复选框内容
                  UserType:'merchant', //类型为商家
            }

            this.submitFlag = true; //提交按钮 变为加载状态 和 不可点击


        try{
          
          uploadMerchantInfo({  //上传文件
            filePath: this.$refs.shopPicture.lists[0].file.path,
            formData: thisMerchantInfo,
          })
          .then(res => {

            const data = JSON.parse(res.data)
            if(res.statusCode === 200){ //请求
              
              if(data.desc === '插入成功' || data.desc === '用户已存在'){

                uni.setStorage({ //用户信息
                  key:'UserInfo',
                  data:i, //授权的用户信息
                  success: () => {
                    uni.setStorage({
                      key: 'UserType',	//客户类型 商家 || 用户
                      data: 'merchant',
                      success:()=>{
                        this.submitFlag = true; 

                      uni.switchTab({
                        url: '/platforms/mp-weixin/s-my/index',
                      })
                        // console.warn('储存成功');
                      }
                    })
                    
                  },
                  fail: () => {
                    return uni.showToast({
                      title: '存储类型错误',
                    })
                  },
                })
              }
              
            }
            
            
          })
          .catch(err =>{
            this.submitFlag = false;
            uni.showToast({title:'异常请再次提交',icon:'none'})
            console.warn(err);
            })


      }catch(err){ //捕捉异常
        this.submitFlag = false;
        uni.showToast({title:'异常请再次提交',icon:'none'})
        console.warn(err);
      }



        

        }else{

          return this.$refs.uTips.show({
            title: '请仔细填写商家信息',
            type: 'error',
            duration: '2300'
          }) 

        }
          
        

          
        }).catch(err =>{console.log(err)})


    },


		areaClick(e){ //地区状态
			let area = '';
			for (const key in e) {
				area += e[key].label;
			}
			this.form.DetailedAddress = this.area = area;
		},


	},

}
</script>

<style lang="scss" scoped >
</style>
