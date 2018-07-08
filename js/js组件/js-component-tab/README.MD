# 组件功能
实现tab切换
![](http://ww1.sinaimg.cn/large/8afe7f49gy1ft29ep9wt9j20hv07mwed.jpg)
[代码与效果](http://js.jirengu.com/geducaveha/9/edit?css,js,output)
# 组件实现方式
1. 先实现tab效果
2. 将其封装

# 使用方式
- 引入jquery
- 引入css样式
- 引入js
- HTML保持类名一致， 样式如下 
```
<div class="tab">
    <ol class ="tab-header">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ol>
    <ol class="tab-content">
      <li>content1</li>
      <li>content2</li>
      <li>content3</li>
    </ol>
  </div>
```
- new Tabs对象如下 
```
var tab = new Tabs(".tab") //()中匹配tab容器
```