//封装全局请求组件


let baseURL = "http://8.136.181.16/api/",
	ajaxTimes = 0;

export default function (params) {

	if (params.form != 'silent') {//如果请求api的时候有带 silent 的字段表示静默登录 如果没有带 默认提示登录
		ajaxTimes++
		uni.showLoading({
			title: '加载中...',
			mask: true,
			icon: 'loading'
		})
	}
	return new Promise((resolve, reject) => {

		uni.request({

			url: baseURL + params.url,
			data: params.data || {},
			header: {
				'content-type': 'application/json; charset=utf-8'
			},
			method: params.method || 'GET',




			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(console.log('请求失败' + err))
			},
			complete: () => {
				
					// console.log('请求成功')
					uni.stopPullDownRefresh();
		
				if (params.form != 'silent') {
					ajaxTimes--
					if (ajaxTimes === 0) {
						uni.hideLoading()
					}
				}
			}
		})
	})
}




