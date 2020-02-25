var crypto = require('crypto');
var fs = require("fs");
var hash = crypto.createHash('sha1');

var name = 'zhangmingzhi';
var file = fs.readFileSync("./package.json");



const buf = Buffer.from('runoob', 'ascii');

hash.update(buf);
console.log(hash.digest('hex'), '~~~~~~~~');