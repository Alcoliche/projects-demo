# 在线音乐播放器
页面分为Fm、Footer和EventCtener。EventCenter管理Fm和footer的交互。
# main功能
- 当用户点击channel时，音乐播放，背景图更换
- 播放、暂停、下一首
- 进度条、时间更新
- 收藏()
# footer功能
- 初始化数据
- 左右按钮点击移动
- 用户点击channel，提交信息到EventCenter
# 歌词实现原理
- 将歌词字符串拆分，每个字符串加上span标签，重新拼接成html
- 延时每个span添加css3animate类+ 类型

# 参考文档
[饥人谷api](http://api.jirengu.com/)
[MDN audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
