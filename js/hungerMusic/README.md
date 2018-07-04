# 在线音乐播放器
页面分为main、footer和EventCtener。EventCenter管理main和footer的交互。
var EventCenter = {
    on: function(type,handler){
        $(document).on(type,handler)
    },
    fire: (type,handler)=>{
        $(document).trigger(type,data)
    }
}
animate
# main功能
- 当用户点击channel时，音乐播放，背景图更换
- 播放、暂停。
- 进度条、时间更新
- 收藏
# footer功能
- ajax 请求数据
- 数据添加到html
- 左右按钮点击移动
- 用户点击channel，提交信息到EventCenter
ul绝对定位，移动它。移动距离 =li个数 * li宽度
box 宽度 < ul 宽度
页面li个数 = box/ li的宽度 取整
end/start判断 box`s width - ul`s left >= ul`s width
var Footer = {
    init: function(){
        //常用数据
    },
    bind: function(){
        //左右按钮
    },
    getData(){
        //ajax请求数据
        //renderFooter()
    },

    renderFooter(channels)=>{
        //用获取的数据拼接html,添加到页面上
        //setStyle()
    },
    setStyle: ()=>{
        var count = this.$footer.find("li").length
        var width = this.$footer.find("li").outerWidth(true)
        //ul.css 设置width = count * width +"px"
    }
}