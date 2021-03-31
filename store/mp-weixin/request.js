	//封装全局请求组件


	let baseURL = "http://localhost:3000", 
			ajaxTimes = 0;

	export default function (options) {
		

		ajaxTimes++
		uni.showLoading({
			// title: '加载中...',
			mask: true,
			icon:'loading'
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + options.url,
				data: options.data || {},
				// header: {
				// 	'content-type':'atext/plain'
				// },
				method: options.method || 'GET',
				success: res => {
					resolve(res)
				},
				fail: err => {
					reject(console.log('请求失败'+ err))
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



