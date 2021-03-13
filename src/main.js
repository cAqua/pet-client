import Vue from 'vue'
import App from './App'

import request from './utils/request';
Vue.prototype.request = request; 

import getDataApi from './js/Weapp-User-Api'
Vue.prototype.api = getDataApi;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
