
var http = require('http')//创建服务器
var path = require('path')//处理URL
var fs = require('fs')//读写文件
var url = require('url')//解析URL

function staicRoot(staticPath, req, res){
    //console.log('staticPath : ' + staticPath)
    //console.log('req.url : ' + req.url)
    var pathObj = url.parse(req.url, true)//用户输入路径
    //console.log(pathObj)

    if(pathObj.pathname ==='/'){//默认路径
        pathObj.pathname += 'test.html'
    }


var filePath = path.join(staticPath, pathObj.pathname)
//读文件
fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
        console.log('404')
        res.writeHead('404', 'not found')
        res.end('<h1> 404, not found </h1>')
    }else{
        console.log('ok')
        res.writeHead(200,'ok')
        res.write(fileContent,'binary')
        res.end()
    }
})
}

console.log(path.join(__dirname, 'sample'))

var server = http.createServer(function(req, res){
    staicRoot(path.join(__dirname, 'sample'), req, res)
    //__dirname 当前路径
})

server.listen(8080)
console.log("visit http://localhost:8080")