import {request,uploadFile} from './request'; // 封装好的请求组件


function uploadLongitude(params) { //获取首页列表
	return request({
		url: "longitude",
		method: "POST",
		data: params, //参数
	})
}


export{
  uploadLongitude
}