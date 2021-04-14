import Vue from 'vue'
import Vuex from 'vuex'
import user from './vuexUser' // 小程序-用户vuex
import Merchant from './vuexMerchant'// 小程序-商家vuex
import WeappPublic from './vuexPublic'// 小程序-小程序公共vuex

Vue.use(Vuex)



const store = new Vuex.Store({

	modules:{
		user,Merchant,WeappPublic
	}
})

export default store
