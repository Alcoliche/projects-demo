function getIp(){
    var promise = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest()
        xhr.open("get", 'https://easy-mock.com/mock/5ac2f80c3d211137b3f2843a/promise/getIp',true)
        xhr.onload = function(){
            var retJson = JSON.parse(xhr.responseText)
            resolve(retJson)
        }
        xhr.onerror = function(){
            reject("get ip error")
        }
    })
    return promise
}
function getCityFromIp(ip){
    var promise = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest()
        xhr.open("get",'https://easy-mock.com/mock/5ac2f80c3d211137b3f2843a/promise/getCityFromIp?ip='+ip,true)
        xhr.onload = function(){
            var retJson = JSON.parse(xhr.responseText)
            resolve(retJson)
        }
        xhr.onerror = function(){
            reject("get city error")
        }

    })
    return promise
}
function getWeatherFromCity(city){
    var promise = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://easy-mock.com/mock/5ac2f80c3d211137b3f2843a/promise/getWeatherFromCity?city='+city, true)
        xhr.onload = function(){
            var retJson = JSON.parse(xhr.responseText)
            resolve(retJson)
        }
        xhr.onerror = function(){
            reject("get weather error")
        }
    })
    return promise
}

//通过promise 避免回调地狱
getIp().then(function(ip){
    return getCityFromIp(ip)
}).then(function(city){
    return getWeatherFromCity(city)
}).then(data=>{
    console.log(data)
}).catch(function(e){
    console.log("error",e)
})






//
function ajax(opts){
    var url = opts.url
    var type = opts.type || 'GET'
    var dataType = opts.dataType || 'json'
    var onsuccess = opts.onsuccess || function(){}
    var onerror = opts.onerror || function(){}
    var data = opts.data || {}

    var dataStr = []
    for(var key in data){
        dataStr.push(key + '=' + data[key])
    }
    dataStr = dataStr.join('&')

    if(type === 'GET'){
        url += '?' + dataStr
    }

    var xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            //成功了
            if(dataType === 'json'){
                onsuccess( JSON.parse(xhr.responseText))
            }else{
                onsuccess( xhr.responseText)
            }
        } else {
            onerror()
        }
    }
    xhr.onerror = onerror
    if(type === 'POST'){
        xhr.send(dataStr)
    }else{
        xhr.send()
    }
}

ajax({
    url: 'http://api.jirengu.com/weather.php',
    data: {
        city: '北京'
    },
    onsuccess: function(ret){
        console.log(ret)
    },
    onerror: function(){
        console.log('服务器异常')
    }
})