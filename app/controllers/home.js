﻿var seneca = require('seneca');
var async = require('async'); 
/*
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

exports.loadagg = function (req, res) {
  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  client.search({
    index: 'scrapy',
    type: 'items',
    body: {
      // query: {
      //   match: {
      //     name: 'zj'
      //   }
      // },
      aggs: {
        "group": {
          terms: {
            field: "url"
          }
        }
      }
    }
  }).then(function (resp) {
      var hits = resp.hits.hits;
      var vgg=resp.aggregations.group.buckets;
      var string = JSON.stringify(vgg)
      res.write(string);
      res.end();
  }, function (err) {
      console.trace(err.message);
  });
  
};

exports.testgetserver = function (req, res) {
  res.write("11");
  res.end();

  // return new Promise((resolve, reject) => {
  //   seneca()
  //   .client({port: 8270,type: 'tcp', pin: 'cmd:run'})
  //   .act('cmd:run', function handler (err, reply) {
  //         res.write(JSON.stringify(reply));
  //         res.end();
  //     }
  //   );
  // })
};



