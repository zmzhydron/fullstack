var koa = require("koa2")
var mysql = require("mysql")
var http = require("http");
var path = require("path")
var net = require('net')
var fs = require("fs");
var cluster = require("cluster")
var os = require("os");

const app = new koa();
// const db = mysql.createConnection({

// })
app.use(async ctx => {
    ctx.body = "zhangmingzhi";
})
app.listen(7777);