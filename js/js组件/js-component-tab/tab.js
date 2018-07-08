// es6 类写法
class Tabs {
    constructor(node){
        this.node = $(node)
        this.init()
        this.bindEvent()
    }
    init(){
        this.node.each(function(index,el){
            $(el).children(".tab-header").find("li").eq(0).addClass("active")
            $(el).children(".tab-content").find("li").eq(0).addClass("active")
          })
    }
    bindEvent(){
        this.node.on("click",".tab-header li",function(el){
            $(this).addClass("active").siblings().removeClass("active")
             var index = $(this).index()
             $(this).closest(".tab").find(".tab-content > li ").eq(index).addClass("active").siblings().removeClass("active")
         })
    }
}

var tab = new Tabs(".tab")
// 原型写法
// function Tabs(node) {
//     //this.__proto__ === Tabs.prototype // true
//     this.node = $(node)
//     this.init()
//     this.bindEvents()
//   }
//   Tabs.prototype.init = function(){
//     this.node.each(function(index,el){
//       $(el).children(".tab-header").find("li").eq(0).addClass("active")
//       $(el).children(".tab-content").find("li").eq(0).addClass("active")
//     })
//   }
//   Tabs.prototype.bindEvents = function(){
//     this.node.on("click",".tab-header li",function(el){
//        $(this).addClass("active").siblings().removeClass("active")
//         var index = $(this).index()
//         $(this).closest(".tab").find(".tab-content > li ").eq(index).addClass("active").siblings().removeClass("active")
//     })
//   }