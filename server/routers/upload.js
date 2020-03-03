var express = require("express")
var router = express.Router();
const multer = require("multer");
var crypto = require('crypto');
var fs = require("fs");
var hash = crypto.createHash('sha1');
var gm = require("gm").subClass({ imageMagick: true });
var path = require('path');
const zlib = require("zlib");
var storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let sessionname = req.session.name;
    console.log(req.zmzsql, 'zmzsql');
    cb(null, '../fileupload');
  },
  filename: function (req, file, cb) {
    cb(null, 'asdasdas' + new Date().valueOf());
  }
})
async function fileFilter(req, file, cb) {
  // console.log(file, 'fileFilter');
  // hash.update(file.buffer);
  // let hashname = hash.digest('hex');
  // console.log(hashname);

  // SQL 查询mysql
  // SQL(`select * from phone where photohash='${hashname}'`).then(({ asyncR, result }) => {
  //   console.log(result, '/api/login');
  //   if (asyncR) {
  //     let r = result.result[0];
  //     console.log(r);
  //   }
  // })
  cb(null, true);
}
var memoryStorage = multer.memoryStorage();
var multerInstance = multer({ storage: memoryStorage, fileFilter: fileFilter })
router.post('/upload', multerInstance.array('photos'), async (req, res, next) => {
  // console.log(req.files, 'photos');
  for (let file of req.files) {
    let { originalname, mimetype: type, size, buffer } = file;
    console.log(file);
    hash.update(file.buffer);
    let hashname = hash.digest('hex');
    hash = crypto.createHash('sha1')
    // console.log(hashname, `hashname`, originalname);
    // // SQL 查询mysql

    let src = path.resolve(__dirname, '../../../fileupload/shitnigger.jpg');
    let photoBuffer = await new Promise((resolve, reject) => {
      gm(buffer)
        .resize(200,200)
        .toBuffer('png', function (err, buffers) {
          if (err) {
            next(err);
            resolve('');
          }
          resolve(buffers);
        })
    })
    if (!photoBuffer) {
      console.log('photoBuffer 长度为0');
      continue;
    }
    // res.send(gmobj);
    let rone = await req.zmzSQL(`select * from photo where photohash='${hashname}'`);
    let { result, asyncR } = rone;
    if (asyncR) {
      let r = result.result[0];
      if (!r) {

        //       originalname: '新建文本文档.txt',
        //         encoding: '7bit',
        //           mimetype: 'text/plain',
        // size: 139
        console.log(photoBuffer);
        let { userid, name } = req.session;

        var query1 = "insert into `photo` SET ?",
          values1 = {
            preview: photoBuffer,
            photohash: hashname,
            userId: userid,
            userName: name,
            name: originalname,
            size: size,
            type: type
          };
        req.zmzpool.query(query1, values1, (err, r, f) => {
          if (err) {
            console.log(err, '~~~~~~~~~~');
          }
          console.log(r);
        })
        /*         req.zmzSQL(`insert into photo(preview,photohash,userId,userName, name,size,type) values("${photoBuffer}",'${hashname}','${userid}', '${name}','${originalname}','${size}','${type}')`).then(val => {
                  if (val.asyncR) {
                    // fs.createWriteStream()
                    console.log("插入成功");
                  }
                }) */
        // 说明可以插入,先写入文件再插入记录，避免写入文件失败，但是sql执行成功的情况
        // fs.writeFile(`../fileupload/${originalname}`, buffer, (err, asdf) => {
        //   if (err) {
        //     next(err);
        //   } else {
        //     let { userid, name } = req.session;
        //     req.zmzSQL(`insert into photo(photo,photohash,userId,userName, name,size,type) values('${photoBuffer},${hashname}','${userid}', '${name}','${originalname}','${size}','${type}')`).then(val => {
        //       if (val.asyncR) {
        //         // fs.createWriteStream()
        //         console.log("插入成功");
        //       }
        //     })
        //   }
        // })

      } else {
        console.log("已经存在~~~", originalname);
      }
    }
  }
  res.send(req.session.name);
})
module.exports = router;