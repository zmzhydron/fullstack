var crypto = require('crypto');
var fs = require("fs");
var hash = crypto.createHash('sha1');

var name = 'zhangmingzhi';
var file = fs.readFileSync("./package.json");
var path = require("path");
var gm = require("gm").subClass({ imageMagick: true });


var name = 'zmz';
var buffer = Buffer.alloc(name.length, name);
console.log(buffer)

// const buf = Buffer.from('runoob', 'ascii');

// hash.update(buf);
// console.log(hash.digest('hex'), '~~~~~~~~');

// var src = path.resolve(__dirname, './1234.jpg');
// console.log(src, '@@@@@@@@@@@@@');

// gm("./aaa.png").write(src, err => {
//   console.log(err);
// })