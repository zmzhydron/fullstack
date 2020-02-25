var koa = require("koa2")
var mysql = require("mysql")
var router = require("koa-router")();
var http = require("http");
var path = require("path")
var net = require('net')
var fs = require("fs");
var cluster = require("cluster")
var os = require("os");
var koaStatic = require('koa-static')
const { kendralust } = require('./components/comptest');
const app = new koa();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'zmz'
})
db.connect(err => {
    console.log("链接成功mysql!!");
});
db.query("select * from contact", (err, result, fields) => {
    result.forEach((item,index) => {
        console.log(item.name);
    })
    // console.log(typeof fields);
})
app.use(kendralust);
router.get('/api/fuckyou', async (ctx,next) => {
    // ctx.body = "fuckyoushitnigger";
    ctx.body = "interacial doogy style";
    await next();
    console.log("~~~~~~~~~~~");
})
app.use(router.routes());
app.use(async (ctx,next) => {
    // ctx.body = "stella cox~~~";
    // ctx.response.body = "kendralust!!!";
    // await next();
    console.log(6);
    ctx.response.body = "milf like it big!!!";
});

app.listen(7777);

