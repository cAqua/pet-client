import Vue from 'vue'
import App from './App'

import uView from 'UI/uView'; //uView UI
Vue.use(uView);

import store from 'store/vuex.js'   //vuex 全局变量 使用 this.$vuex使用
Vue.prototype.$vuex = store



Vue.config.productionTip = false  
App.mpType = 'app'
const app = new Vue({
  ...App
})


	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
