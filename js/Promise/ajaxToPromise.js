// ajax 封装 
function ajax(opts){
    var url = opts.url
    var type = opts.type || "get"
    var dataType = opts.dataType || "json"
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
    
    var promise = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest()
        xhr.open(type, url, true)
        xhr.onload = function(){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                //成功操作
                if(dataType === "json"){
                    resolve(JSOn.parse(xhr.responseText))
                }else{
                    resolve(xhr.responseText)
                }
            } else {
                reject()
            }
        }
        xhr.onerror = onerror
        if(type === "post"){
            xhr.send(dataStr)
        }else{
            xhr.send()
        }
    })
}
//ajax封装-promise 
function ajax(opts){
    var url = opts.url
    var type = opts.type || "get"
    var dataType = opts.dataType || "json"
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
    
    var promise = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest()
        xhr.open(type, url, true)
        xhr.onload = function(){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                //成功操作
                if(dataType === "json"){
                    resolve(JSOn.parse(xhr.responseText))
                }else{
                    resolve(xhr.responseText)
                }
            } else {
                reject()
            }
        }
        xhr.onerror = onerror
        if(type === "post"){
            xhr.send(dataStr)
        }else{
            xhr.send()
        }
    })
}
  