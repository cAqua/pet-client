// import { reject, resolve } from 'core-js/fn/promise';
import {request,uploadFile} from './request'; // 封装好的请求组件




/* 商家注册 */
function uploadMerchantInfo(params, form) { //商家注册 插入表
	return uploadFile({
		url: "insertStorte",
		data: params, //参数
		form: form, //登录类型
	})
}

function IfmerchantName(params, form) { //验证商家名是否存在
	return request({
		url: "ifusername",
		method: "POST",
		data: params, //参数
		form:'silent', //
	})
}




export {
  uploadMerchantInfo,
	IfmerchantName,
}