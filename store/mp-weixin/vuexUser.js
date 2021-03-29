export default {
	state: {
			uViewTabBar: [ //定义tabbar
				{
					iconPath: "/static/mp-weixin/icon/home.png",
					selectedIconPath: "/static/mp-weixin/icon/_home.png",
					text: '首页',
					count: 0,
					isDot: true,
					pagePath: "/platforms/mp-weixin/y-home/index",
			
				},
				{
					iconPath: "/static/mp-weixin/icon/PetCrcle.png",
					selectedIconPath: "/static/mp-weixin/icon/_PetCrcle.png",
					text: '宠物圈',
					midButton: true,
					pagePath: "/platforms/mp-weixin/y-PetCrcle/index"
				},
				{
					iconPath: "/static/mp-weixin/icon/my.png",
					selectedIconPath: "/static/mp-weixin/icon/_my.png",
					text: '我的',
					pagePath: "/platforms/mp-weixin/y-my/index"
				},
			],
			$tcolor:'#2979ff', //全局主体颜色
			UmaskFlag:false, //遮罩层
			// MerchantInfo:{},//商家数据
			hasLogin:false,
			UserInfo:{}, //用户数据
		},
		mutations: {
			login(state, provider) {
				state.hasLogin = true;
				state.userInfo = provider;
				uni.setStorage({ //缓存用户登陆状态
					key: 'userInfo',
					data: provider
				})
			},
			logout(state) {
				state.hasLogin = false;
				state.userInfo = {};
				uni.removeStorage({
					key: 'userInfo'
				})
			}
	 
		
		}
}