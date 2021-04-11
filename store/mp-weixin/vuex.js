import Vue from 'vue'
import Vuex from 'vuex'
import home from './vuexUser'
import Merchant from './vuexMerchant'

Vue.use(Vuex)



const store = new Vuex.Store({

	modules:{
		home,Merchant
	}
})

export default store
