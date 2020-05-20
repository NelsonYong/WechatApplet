

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

- cloudfinctions : 保存云函数的文件夹
- miniprogram ：  小程序开发目录
  - components ： 公共组件
  - images ：  本地图片
  - pages：  小程序所有页面文件夹
  - style： 部分小程序公共样式
  - app.js : 小程序的注册入口
  - app.json : 小程序全局配置
  - app.wxss: 全局样式
  - sitemap.json: 记录小程序页面是否能被微信索引

  微信索引： 表示页面能在微信搜索栏中搜索到

  README.md： 项目描述
  
project.config.json: 保持开发的个性化设置


wxss响应单位： rpx 
  开发时模拟器用iPhone6 1px = 2rpx

小程序页面共有四个文件
wxml：类似html ，必须
js： 必须
wxss： 类似css ，不是必须
json： 页面配置文件，不是必须

页面布局
view组件 ==》 div
text组件 ==》 span



