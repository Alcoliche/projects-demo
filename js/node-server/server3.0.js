var http = require('http')
var fs = require('fs')
var url = require('url')


http.createServer(function(req, res){

    var pathObj = url.parse(req.url,true)
    console.log(pathObj)

    switch(pathObj.pathname){
        case '/getWeather':
            var ret
            if(pathObj.query.city == 'beijing'){
                ret = {
                    city: 'foshan',
                    weather:'sunny'
                }
            }else{
                ret = {
                    city: pathObj.query.city,
                    weather:'not found'
            }
            }
            res.end(JSON.stringify( ret))
            break;
        case '/user/123':
            res.end(fs.readFileSync(__dirname + '/sample/user.tpl'))
            break;
        default:
            res.end(fs.readFileSync(__dirname + '/sample' + pathObj.pathname))
    }
}).listen(8080)
console.log( 'listen http://localhost:8080')