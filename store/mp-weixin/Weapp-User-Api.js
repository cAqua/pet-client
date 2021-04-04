import request from './request'; // 封装好的请求组件


                 
function userLoginApi(params,form) { //静默登录
    return request({
        url: "/api/insertUser/",
		method:"POST",
		data:params, //参数
        form:form || true,//登录类型
    })
}





export {
    userLoginApi,
}