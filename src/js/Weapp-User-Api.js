import request from './request'; // 封装好的请求组件



function getData() {
    return request({
        url: "/image/v1/vertical/category"
    }).catch(error => {
        console.warn('错误信息' + error )
    })

}




export {
    getData
}