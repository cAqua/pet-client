import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uViewTabBar: [ //定义tabbar
			{
				iconPath: "/static/mp-weixin/icon/home.png",
				selectedIconPath: "/static/mp-weixin/icon/_home.png",
				text: '首页',
				count: 0,
				isDot: true,
				pagePath: "/platforms/mp-weixin/home/index",
		
			},
			{
				iconPath: "/static/mp-weixin/icon/PetCrcle.png",
				selectedIconPath: "/static/mp-weixin/icon/_PetCrcle.png",
				text: '宠物圈',
				midButton: true,
				pagePath: "/platforms/mp-weixin/PetCrcle/index"
			},
			{
				iconPath: "/static/mp-weixin/icon/my.png",
				selectedIconPath: "/static/mp-weixin/icon/_my.png",
				text: '我的',
				pagePath: "/platforms/mp-weixin/my/index"
			},
		],
		$tcolor:'#2979ff', //全局主体颜色
		UmaskFlag:'false', //遮罩层
		UserInfo:{}, //用户数据
		MerchantInfo:{},//商家数据
	},
	mutations: {
		functions(state, provider) {
       
		},
	
	}
})

export default store
