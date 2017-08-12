var seneca = require('seneca');
var async = require('async'); 
/*!
 * Module dependencies.
 */
exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

exports.getdata = function (req, res) {
  // data=require("../core/stock/xuqiu");
  var bookrep = require('../../microservice/user/userrespository');
  var content=bookrep.add({uniqueId:require('node-uuid').v1(),lastName: 'Hancock',firstName: 'John'},handler);
  if(content==true)
  {
    res.write("针对请求返回正确数据，请更新绑定的变量");
    res.end();
  }
  else
  {
    res.write("针对请求返回错误数据，请更新绑定的变量");
    res.end();
  }
  // seneca()
  // .client({port: 8270,type: 'net', pin: 'cmd:run'})
  // //.use(local)
  // .act('cmd:run', handler);
};

exports.getuser = function (req, res) {
  // res.render('home/main', {
  // title: 'Node Express Mongoose Boilerplate'
  //   });
  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  client.search({
    index: 'index',
    type: 'type',
    body: {
      query: {
        match: {
          name: 'zj'
        }
      }
    }
  }).then(function (resp) {
      var hits = resp.hits.hits;
      var string = JSON.stringify(hits[0])
      res.write(string);
      res.end();
  }, function (err) {
      console.trace(err.message);
  });
  
};



function handler (err, reply) {
  console.log(err, reply)
  // var callback=data.getdata();
  // res.write("针对请求返回数据，请更新绑定的变量"+callback);
  // res.end();


}


