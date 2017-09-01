var querystring=require("querystring");
var http=require("http");

exports.index = function (req, res) {
    var info=req.query.info;
    return new Promise((resolve, reject) => {
        var url = 'http://www.tuling123.com/openapi/api?key=244720f4657442c9b5082bc7e76f674a' +'&info='+ info;
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