var http = require('http')
var fs = reuqire('fs')
var url = require('url')
http.createServer(function(req, res){
    var pathObj = url.parse(req.url,true)
    console.log(pathObj)
    switch(pathObj.pathname){
        case '/getWeather':
            if(pathObj.query.city == 'beijing'){
                ret = {
                    city: 'foshan',
                    weather:'sunny'
                }
            }else{
                ret = {
                    city: pathObj.query.city,
                    weather:'sunny'
            }
            }
            res.end(JSON.stringify({a:1 , b:2}))
            break;
        case 'user/123':
            res.end(fs.readFileSync(__dirname + '/sample/test.html'))
            break;
        default:
            res.end(fs.readFileSync(__dirname + '/sample' + pathObj.pathname))
    }
}).listen(8080)