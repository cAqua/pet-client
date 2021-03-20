import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uViewTabBar: [
			{
				iconPath: "/static/weixin/icon/home.png",
				selectedIconPath: "/static/weixin/icon/_home.png",
				text: '首页',
				count: 0,
				isDot: true,
				pagePath: "/pages/weixin/home/index",
		
			},
			{
				iconPath: "/static/weixin/icon/PetCrcle.png",
				selectedIconPath: "/static/weixin/icon/_PetCrcle.png",
				text: '宠物圈',
				midButton: true,
				pagePath: "/pages/weixin/PetCrcle/index"
			},
			{
				iconPath: "/static/weixin/icon/my.png",
				selectedIconPath: "/static/weixin/icon/_my.png",
				text: '我的',
				pagePath: "/pages/weixin/my/index"
			},
		]
	},
	mutations: {
		functions(state, provider) {
       
		},
	
	}
})

export default store
