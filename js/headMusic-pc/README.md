# 项目 PC端FM电台
本项目实现了一个在线的FM电台，用户能用户能够根据自己的喜欢选择相应的频道享受音乐。
[实现效果](https://wheadplus.github.io/projects-demo/js/headMusic-pc/music.html)
# 主要功能
- 暂停/播放 下一首
- 歌词滚动展示
# 项目实现过程
本项目用jquery实现，页面分为Fm、Footer和EventCtener。EventCenter管理Fm和footer的交互。
# 主要难点
## 频道滚动原理
1. 频道li浮动，超出窗口部分隐藏
2. 点击左右移动按钮，移动窗口中频道li综合的距离

## 歌词实现原理
1. 歌词获取下来json格式，如“[1:30:11],作词”，需要用正则匹配将时间和文本分开。保存到对象中键和值
2. 当前时间匹配对象的键（歌词时间）来展现对应歌词
## 歌词滚动（封装jq插件），通过animate实现
1. 将歌词字符串拆分，每个字符串加上span标签，重新拼接成html
2. 延时每个span添加css3animate类+ 类型
# 技术栈
- jquery
- css3
- 响应式
- ajax

# 参考文档
[饥人谷api](http://api.jirengu.com/)
[MDN audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
