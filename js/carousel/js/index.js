function Carousel($ct){
    this.init($ct)
    this.bind()
}
Carousel.prototype = {
    constructor : Carousel,
    init : function(ct){
        this.$ct = $(ct)
        this.$imgBox = this.$ct.find(".imgBox")
        this.$img = this.$ct.find(".imgBox li")
        this.$imgWidth = this.$img.width()
        this.$imgCount = this.$img.length
        this.$bullets = this.$ct.find(".bullets li")
        this.$arrow = this.$ct.find(".arrow")
        this.$left = this.$ct.find(".left-btn")
        this.$right = this.$ct.find(".right-btn")
        this.clock
        this.autoPlay()

        this.index = 0
        //imgs = [1,2,3,4] 将1克隆放在最后，4克隆放在前面 [4,1,2,3,4,1]
        this.$imgBox.append(this.$img.first().clone())
        this.$imgBox.prepend(this.$img.last().clone())
        this.$imgBox.width((this.$imgCount+2) * this.$imgWidth)
        this.$imgBox.css("left",-this.$imgWidth)
    },
    bind : function(){
        var _this = this
        this.$right.on("click",()=>{
            console.log("right..")
            this.btnNext(1)
        })
        this.$left.on("click",()=>{
            console.log("left..")
            this.btnPre(1)
        })
        this.$bullets.on("click",function(){
            
            var BulletIndex =$(this).index()
            if(BulletIndex > _this.index){
                _this.btnNext(BulletIndex - _this.index)
            }else{
                _this.btnPre(_this.index - BulletIndex)
            }
        })
        this.$ct.hover(()=>{
            this.pauseAutoPlay()
            this.$arrow.css("opacity",1)
        },()=>{
            this.autoPlay()
            this.$arrow.css("opacity",0)
        })

    },
    btnNext(moveCount){
        this.$imgBox.animate({
            left: "-=" + this.$imgWidth* moveCount + "px"
        },()=>{
            this.index += moveCount
            if(this.index === this.$imgCount){
                //[4,1,2,3,4,1] index [0] = 1 index[4]= 1 ，imgBox整体位移到初始位置
                console.log("end...")
                //animate()过程，css()设置值
                this.$imgBox.css(  "left", -this.$imgWidth)
                this.index = 0
            }
            this.setBullet()
        })
        
    },
    btnPre(moveCount){
        this.$imgBox.animate({
            left: "+=" + this.$imgWidth * moveCount + "px"
        },()=>{
            this.index -= moveCount
            if(this.index < 0){
                //[4,1,2,3,4,1] index [-1] = 4  ，imgBox整体位移到 index[3] = 4
                this.$imgBox.css("left",-this.$imgWidth * (this.$imgCount))
                this.index = this.$imgCount-1
            }
            this.setBullet()
        })
    },
    setBullet(){    
        this.$bullets.eq(this.index).addClass("active").siblings().removeClass("active")
    },
    autoPlay(){
        var _this = this
        this.clock = setInterval(function(){
            _this.btnNext(1)
        },1800)
    },
    pauseAutoPlay(){
        clearInterval(this.clock);
    }
}
 var a = new Carousel(".c1")
 var b = new Carousel(".c2")