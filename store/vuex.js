import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uViewTabBar: [
			{
				iconPath: "/static/icon/home.png",
				selectedIconPath: "/static/icon/_home.png",
				text: '首页',
				count: 0,
				isDot: true,
				pagePath: "/pages/home/index",
		
			},
			{
				iconPath: "/static/icon/PetCrcle.png",
				selectedIconPath: "/static/icon/_PetCrcle.png",
				text: '宠物圈',
				midButton: true,
				pagePath: "/pages/PetCrcle/index"
			},
			{
				iconPath: "/static/icon/my.png",
				selectedIconPath: "/static/icon/_my.png",
				text: '我的',
				pagePath: "/pages/my/index"
			},
		]
	},
	mutations: {
		functions(state, provider) {
       
		},
	
	}
})

export default store
