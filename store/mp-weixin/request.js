	//封装全局请求组件


	let baseURL = "http://8.136.181.16", 
			ajaxTimes = 0;

	export default function (options) {
		

		ajaxTimes++
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + options.url,
				method: options.method || 'GET',
				data: options.data || {},
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					reject(err)
				},
				complete: () => {
					ajaxTimes--
					if (ajaxTimes === 0) {
						uni.hideLoading()
					}
				}
			})
		})
	}



