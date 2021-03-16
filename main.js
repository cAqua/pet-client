import Vue from 'vue'
import App from './App'

import uView from 'UI/uView'; //uView UI
Vue.use(uView);

import store from 'store/vuex.js'  
Vue.prototype.$vuex = store

// Vue.config.productionTip = false  



App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
