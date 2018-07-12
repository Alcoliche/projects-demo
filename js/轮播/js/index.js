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
        this.$left = this.$ct.find(".left-btn")
        this.$right = this.$ct.find(".right-btn")

        this.index = 0
        //imgs = [1,2,3,4] 将1克隆放在最后，4克隆放在前面 [4,1,2,3,4,1]
        this.$imgBox.append(this.$img.first().clone())
        this.$imgBox.prepend(this.$img.last().clone())
        this.$imgBox.width((this.$imgWidth+2) * this.$imgCount)
        this.$imgBox.css("left",-this.$imgWidth)
    },
    bind : function(){
        this.$right.on("click",()=>{
            console.log("right..")
            this.btnNext()
        })
        this.$left.on("click",()=>{
            console.log("left..")
            this.btnPre()
        })
        this.$bullets.on("click",()=>{
            console.log("bullet..")
        })
    },
    btnNext(){
        
        console.log(this.index)
        this.$imgBox.animate({
            left: "-=" + this.$imgWidth + "px"
        })
        //animate()过程渐变，css()过程突变
        if(this.index === this.$imgCount){
            this.$imgBox.css(  "left", -this.$imgWidth )
            this.index = 0
        }
        this.index++
        this.setBullet(this.index)
    },
    btnPre(){

    },
    setBullet(index){
        this.$bullets.eq(index).addClass("active").removeClass("active")
    }
}
 new Carousel(".carousel")