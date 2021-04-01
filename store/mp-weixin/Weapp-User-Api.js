import request from './request'; // 封装好的请求组件


                 
function getUserInfoApi(param) { //插入表
    return request({
        url: "/api/insertUser/",
		method:"POST",
		data:param,
    })
}




export {
    getUserInfoApi
}