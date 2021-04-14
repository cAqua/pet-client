// import { reject, resolve } from 'core-js/fn/promise';
import request from './request'; // 封装好的请求组件


/* 商家注册 */
function merchantRegistered(params, form) { //商家注册 插入表
	return request({
		url: "insertStorte",
		method: "POST",
		data: params, //参数
		form: form, //登录类型
	})
}






export {
  merchantRegistered
}