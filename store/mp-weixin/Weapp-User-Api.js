// import { reject, resolve } from 'core-js/fn/promise';
import request from './request'; // 封装好的请求组件



function userLoginApi(params, form) { //静默登录
	return request({
		url: "/api/insertUser/",
		method: "POST",
		data: params, //参数
		form: form || true, //登录类型
	})
}

function ifStorte(params) { //判 断用户 || 商家 是否存在的接口
	return request({
		url: "/api/ifStorte/",
		method: "POST",
		data: params, //参数
	})
}




function dunamic(param) { //插入表
	return request({
		url: "/api/dunamic/",
		method: "POST",
		data: param,
	})
}

function crcle(param) { //获取列表
	return request({
		url: "/api/dunamicList/",
		method: 'POST',
		data: param
	})
}





export {
	userLoginApi,
	dunamic,
	crcle,
	ifStorte,
}