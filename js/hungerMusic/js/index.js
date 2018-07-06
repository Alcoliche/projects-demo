var EventCenter = {
    on: function(type, handler){
      $(document).on(type, handler)
    },
    fire: function(type, data){
      $(document).trigger(type, data)
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
                _this.isToStart = false
                //console.log(parseFloat(_this.$ul.css("left")),parseFloat(_this.$box.css("width") ) )
                if(parseFloat(_this.$box.css('width'))-parseFloat(_this.$ul.css("left"))>=parseFloat(_this.$ul.css("width"))){
                   _this.isToEnd = true         
                }
            }
        })

        this.$leftBtn.on("click",function(){
            var liWidth =  _this.$footer.find("li").outerWidth(true);
            var liCount = Math.floor(_this.$box.width()/liWidth)
            //console.log(_this.isToStart)
            if(!_this.isToStart){   
                _this.$ul.css({
                    left: '+='+liCount*liWidth //"-="
                })
                _this.isToEnd = false
            }
            //console.log(parseFloat(_this.$ul.css("left")))
            if(parseFloat(_this.$ul.css("left"))>=0){
                _this.isToStart = true
            }
        })

        this.$ul.on("click","li",function(){
            $(this).addClass("active")
                .siblings().removeClass("active")
            EventCenter.fire("select-albumn",{
                channelId : $(this).attr("data-channel-id"),
                channelName : $(this).attr("data-channel-name")
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
            html += '<li data-channel-id= '+channel.channel_id+' data-channel-name='+channel.name+'>'+
                            '<figure style="background-image:url('+channel.cover_small+')"></figure>'+
                            '<p>'+channel.name+'</p>'+
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
    init: function(){
        this.$bg = $(".bg")
        this.$play = $(".btn-play")
        this.$collect = $(".btn-collect")
        this.$next = $(".btn-next")
        this.$container = $("main")
        this.channelId 
        this.channelName 
        this.currentSong
        this.clock
        this.lyricObj
        this.audio = new Audio()
        this.audio.autoplay = true
        this.audio.autoplay = true;
        this.bind()
    },
    bind: function(){ 
        var _this = this
        EventCenter.on("select-albumn", function(e, channelObj){
            //console.log(" fire i am here")
            _this.channelId = channelObj.channelId
            _this.channelName = channelObj.channelName
            console.log(_this.channelName,_this.channelId)
            _this.loadMusic(_this.channelId)
        })

        this.$play.on("click",function(){
            if(_this.$play.hasClass("icon-stop")){
                _this.audio.pause();
                _this.$play.removeClass("icon-stop").addClass("icon-play")
            }else{
                console.log("sss")
                _this.audio.play();
                _this.$play.removeClass("icon-play").addClass("icon-stop")
            }
        })

        this.$next.on("click",function(){
            console.log("next....")
            _this.loadMusic(_this.channelId)
        })

        this.$collect.on("click",function(){
            _this.$collect.toggleClass("select")
        })

        this.audio.addEventListener('play', function(){
            console.log('playing')
            _this.clock = setInterval(function() {
                _this.updateStatus()
              }, 1000)
            
          })

        this.audio.addEventListener('ended', function(){
            console.log('ended')
            _this.loadMusic(_this.channelId)
          })
        //监听按钮 暂停/播放 下一曲loadmusic() ,setMusic()
        //监听audio
    },
    loadMusic(channelId){
        var _this =this
        $.getJSON(
            "//jirenguapi.applinzi.com/fm/getSong.php",
            {channel: channelId}
        ).done(function(ret){
            _this.setMusic(ret.song[0]||null)
        })
    },
    loadLyric(sid){
        var _this =this
        //ajax请求 sid = this.song.sid
        $.getJSON(
            "//jirenguapi.applinzi.com/fm/getLyric.php",
            {sid: sid}
        ).done(function(ret){
            console.log(ret.lyric)
            var lyricObj = {}
            ret.lyric.split("\n").forEach(function(line){
                var timeArr = line.match(/\d{2}:\d{2}/g)
                if(timeArr){
                    timeArr.forEach(function(time){
                        lyricObj[time] = line.replace(/\[.+?\]/g,"")
                    })
                }
            })
            _this.lyricObj = lyricObj
        })
        
        lyric.split("\n")
    },
    setMusic(song){
        var _this = this
        console.log(song)
        this.currentSong = song
        this.audio.src = song.url
        this.audio.play()
        this.$bg.css( 'background-image',  'url('+song.picture+')' )
        this.$container.find(".aside figure").css( 'background-image',  'url('+song.picture+')')
        this.$container.find(".musicInfo .tag").text(this.channelName)
        this.$container.find(".musicInfo h2").text(song.title)
        this.$container.find(".musicInfo .author").text(song.artist)
        
        this.$play.removeClass("icon-play").addClass("icon-stop")
        this.loadLyric(song.sid)
    },
    updateStatus(){
        //修改进度条 ，时间
        var min = Math.floor(this.audio.currentTime/60)
        var second = Math.floor(this.audio.currentTime%60)+ ""
        second = second.length ===2? second : "0" + second
        var progerssPercent =  this.audio.currentTime/this.audio.duration
        //console.log(progerssPercent)
        this.$container.find(".currentTime").text(min+":"+second)
        this.$container.find(".progressBar").css("width",progerssPercent*100+'%')
        
        var line = this.lyricObj["0"+min+":"+second]
        if(line){
            this.$container.find(".lyric").text(line)
        }
    }
}
Footer.init();
Fm.init();