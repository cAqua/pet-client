// import { reject, resolve } from 'core-js/fn/promise';
import {request} from './request'; // 封装好的请求组件


/* 登录api */
function userLoginApi(params, form) { //用户注册 插入表
	return request({
		url: "insertUser",
		method: "POST",
		data: params, //参数
		form: form || true, //登录类型
	})
}


function ifStorte(params) { //判 断用户 || 商家 是否存在的接口
	return request({
		url: "ifStorte",
		method: "POST",
		data: params, //参数
	})
}



/* 宠物圈 Api */
function dunamic(param) { //插入表
	return request({
		url: "dunamic",
		method: "POST",
		data: param,
	})
}
function crcle(param) { //获取宠物圈列表
	return request({
		url: "dunamicList",
		method: 'POST',
		data: param,

	})
}
function comment(param) { //发表评论
	return request({
		url: "comment",
		method: 'POST',
		data: param,

	})
}
function reply(param) { //评论内评论
	return request({
		url: "reply",
		method: 'POST',
		data: param,

	})
}
function commentList(param) { //评论列表
	return request({
		url: "inquireComment",
		method: 'POST',
		data: param,

	})
}
function commentSon(param) { //评论的评论列表
	return request({
		url: "commentSon",
		method: 'POST',
		data: param,

	})
}
function thisreply(param) { //回复的列表
	return request({
		url: "thisreply",
		method: 'POST',
		data: param,

	})
}




export {
	userLoginApi,//用户注册
	dunamic,
	crcle,
	ifStorte,
	comment,
	commentList,
	commentSon,
	reply,
	thisreply,
}