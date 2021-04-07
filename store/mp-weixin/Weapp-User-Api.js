import request from './request'; // 封装好的请求组件



function userLoginApi(params, form) { //静默登录
	return request({
		url: "/insertUser/",
		method: "POST",
		data: params, //参数
		form: form || true,//登录类型
	})
}

function dunamic(param) { //插入表
	return request({
		url: "/dunamic/",
		method: "POST",
		data: param,
	})
}
function crcle(param) { //获取列表
	return request({
		url: "/dunamicList/",
		method: 'POST',
		data: param,

	})
}
function comment(param) { //获取列表
	return request({
		url: "/dunamiclistcomment/",
		method: 'POST',
		data: param,

	})
}
function commentList(param) {
	return request({
		url: "/particularspage/",
		method: 'POST',
		data: param,

	})
}




export {
	userLoginApi,
	dunamic,
	crcle,
	comment,
	commentList
}