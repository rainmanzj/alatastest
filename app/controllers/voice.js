var http = require('http');        // 通过http模块访问百度的接口
var querystring = require('querystring');    // 处理请求参数的querystring模块
var fs = require('fs');      // fs模块，用来保存语音文件
var path = require('path');    // path模块，处理路径

exports.index = function (req, res) {
    var text=req.query.text;
    return new Promise((resolve, reject) => {
        var url = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=' + text;
        var reqnew = http.get(url, function(resnew) {
            var body = '';
            resnew.on('data',function(data){
                body += data;
            }).on('end', function(){
                res.write(JSON.parse(body)["text"]);
                res.end();
            })
            }).on('error', function(e) {
                res.write("Got error: " + e.message);
                res.end();
            });
    })

  };