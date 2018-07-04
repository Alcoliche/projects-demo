var EventCenter = {
    on: (type,handler)=>{
        $(document).on(type,hander)
    },
    fire: (type,handler)=>{
        $(document).trigger(type,data)
    }
}
var Footer = {
    init: function(){
        this.$footer =$("footer");
        this.$ul =$("footer").find("ul");
        this.$box = $("footer").find(".box");
        this.$rightBtn = $("footer").find(".icon-right")
        this.$leftBtn =$("footer").find(".icon-left")
        this.isToEnd = false;
        this.isToStart = true;

        this.bind();
        this.getData();
    },
    bind: function(){
        var _this = this
        this.$rightBtn.on("click",function(){
            //console.log("rightbtn...")
            var liWidth =  Math.floor(_this.$footer.find("li").outerWidth(true));
            var liCount = Math.floor(_this.$box.width()/liWidth)
            //console.log(liWidth,liCount)
            if(!_this.isToEnd){
                
                _this.$ul.css({
                    left: '-='+liCount*liWidth //"-="
                })
                console.log(parseFloat(_this.$ul.css("left")),parseFloat(_this.$box.css("width") ) )
                if(parseFloat(_this.$box.css('width'))-parseFloat(_this.$ul.css("left"))>=parseFloat(_this.$ul.css("width"))){
                   _this.isToEnd = true 
                }
            }
           
        })

        this.$leftBtn.on("click",function(){
            var liWidth =  _this.$footer.find("li").outerWidth(true);
            var liCount = Math.floor(_this.$box.width()/liWidth)
            _this.$ul.css({
                left: '+='+liCount*liWidth //"-="
            })
        })
    },
    getData(){
        var _this = this
        $.getJSON('//jirenguapi.applinzi.com/fm/getChannels.php')
            .done(function (ret) {
                //  console.log(ret)
                
                _this.renderFooter(ret.channels)
            }).fail(function () {
                console.log('error')
            })
    },
    renderFooter(channels){
        // console.log("rendering "+channels)
        var html = "";
        channels.unshift({
            name: "我的收藏", 
            channel_id: "public_tuijian_collect",
            cover_big: "http://cloud.hunger-valley.com/music/public_tuijian_spring.jpg-big",
            cover_middle: "http://cloud.hunger-valley.com/music/public_tuijian_spring.jpg-middle",
            cover_small: "http://cloud.hunger-valley.com/music/public_tuijian_spring.jpg-small"
        })
        channels.forEach(channel => {
            html += '<li data-channel-id= '+channel.channel_id+' data-channel-name='+channel.channelName+'>'+
                        '<a href="">'+
                            '<figure style="background-image:url('+channel.cover_small+')"></figure>'+
                            '<p>'+channel.name+'</p>'+
                        '</a>'+
                    '</li>'
        });
        this.$ul.html(html)
        this.setStyle()
    },
    setStyle(){
        console.log('setstyle ..')
        var count = this.$footer.find("li").length
        var width =  this.$footer.find("li").outerWidth(true)
        this.$ul.css({
            width: count * width + "px"  
        })
    }
}
var Fm = {
    intit: function(){
        this.bind()
        this.audio = new Audio()
        
    },
    bind: function(){ 
        var _this = this
        EventCenter.on("select-albumn", function(e, channelObj){
            _this.channelId = channelObj.channelId
            _this.channelName = channelObj.channelName
            _this.loadMusic()
        })

        //监听按钮 暂停/播放 下一曲loadmusic() ,setMusic()
        //监听audio
    },
    loadMusic(){
        // 
        $.getJSON(

        ).done(
            setMusic()
        )
    },
    setMusic(){
        this.audio.src()
        //背景图、tag、h2、author

        //重置按钮 去play 加暂停
    },
    updateStatus(){
        //修改进度条 ，时间
        var min = Math.floor(Fm.audio.currentTime/60)
        var second = Math.floor(Fm.audio.currentTime%60)+ ""
        second = second.length ===2? second : "0" + second

    }
}
Footer.init();