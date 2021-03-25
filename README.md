# 宠物小程序-客户端

## 目录文件介绍

- components 组件目录
- pages 页面文件
- store 全局js文件夹 
- src/Socketio && style 聊天框架 && 基础样式
- static 静态文件 
- pages.json 注册页面 注册页面记得加条件编译
- uni.scss 全局样式文件 目前存放主题色 <font color=#007aff>$tcolor</font>
- UI ui库
- uni_modules uni-ui


在没点击退出和清楚数据之前
本地缓存的数据都是存在的

情况一 : 用户第一次打开 这时候 本地存储判断没有  弹框 选择 用户商家 选择玩获取数据
情况二 : 用户第二次登录 判断本地存储有数据 这时候发起请求