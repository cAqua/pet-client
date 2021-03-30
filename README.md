# 宠物小程序-客户端

## 目录文件介绍

- components 组件目录
- platforms s-代表商家  y-代表用户 页面文件
- store 全局js文件夹 
- src/Socketio && style 聊天框架 && 基础样式
- static 静态文件 
- pages.json 注册页面 注册页面记得加条件编译
- uni.scss 全局样式文件 目前存放主题色 <font color=#007aff>$tcolor</font>
- UI ui库
- uni_modules uni-ui
- unpackage 打包目录


# 用户登录模块完成
1.需要个全局 函数 在点击的时候 判断当前本地有没有用户数据如果没有的话处理相关逻辑
在页面加载的时候要判断有没有授权数据,
如果有授权数据 点击相关按钮要 return 如果没有相关数据要继续请求

  其他页面只需要判断,有没有授权 提示用户授权 只有my页面需要
  
2. 看布局文章 主页页面按照优剪重新排版 刷面试题
