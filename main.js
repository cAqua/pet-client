import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false  

import uView from 'UI/uView'; //uView UI
Vue.use(uView);

import store from './store/mp-weixin/vuex'   //vuex 全局变量 使用 this.$vuex使用



App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})


	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
