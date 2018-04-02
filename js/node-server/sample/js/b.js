alert(' I am  b.js')
var xhr = new XMLHttpRequest()
xhr.open('get','/getWeather',true)
xhr.send()
xhr.onload = function(){
    console.log(JSON.parse(xhr.responseText))x
}