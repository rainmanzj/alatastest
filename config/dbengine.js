
function db() {
   this.type='mongodb';
   this.db=null;
   this.sqldb=null;

   this.consqldb=function()
   {
        const Sequelize = require('sequelize');
        this.sqldb = new Sequelize('cdo', 'zj', 'zj', {
        host: 'localhost',
        dialect: 'mysql',//|'sqlite'|'postgres'|'mssql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        });
   }
   this.con=function()
   {
        if(this.type=='mongodb')
        {
            this.db = require('seneca')();
            // this.db.use('basic').use('entity');
            this.db.use('mongo-store', {
            uri: 'mongodb://120.0.0.1:27017/cdo'
            });
        }
        else if(this.type=='mysql')
        {
            this.db = require('seneca')()
            this.db.use('basic').use('entity');
            this.db.use('mysql-store', {
            name:'senecatest',
            host:'localhost',
            user:'senecatest',
            password:'senecatest',
            port:3306
            })
        }
   }
};

module.exports=db;