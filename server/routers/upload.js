var express = require("express")
var router = express.Router();
const multer = require("multer");
var crypto = require('crypto');
var fs = require("fs");
var hash = crypto.createHash('sha1');
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
  console.log(file, 'fileFilter');
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
    hash.update(file.buffer);
    let hashname = hash.digest('hex');
    hash = crypto.createHash('sha1')
    console.log(hashname, `hashname`);
    // // SQL 查询mysql
    let rone = await req.zmzSQL(`select * from photo where photohash='${hashname}'`);
    let { result, asyncR } = rone;
    if (asyncR) {
      let r = result.result[0];
      if (!r) {

        //       originalname: '新建文本文档.txt',
        //         encoding: '7bit',
        //           mimetype: 'text/plain',
        // size: 139

        // 说明可以插入,先写入文件再插入记录，避免写入文件失败，但是sql执行成功的情况
        fs.writeFile(`../fileupload/${originalname}`, buffer, (err, asdf) => {
          if (err) {
            next(err);
          } else {
            console.log(asdf);
            let { userid, name } = req.session;
            req.zmzSQL(`insert into photo(photohash,userId,userName, name,size,type) values('${hashname}','${userid}', '${name}','${originalname}','${size}','${type}')`).then(val => {
              if (val.asyncR) {
                // fs.createWriteStream()
                console.log("插入成功");
              }
            })
          }

        })

      } else {
        console.log("已经存在~~~", originalname);
      }
    }
  }

  // console.log(typeof req.body.photos);
  // for (let value of req.body.photo){
  //   console.log(value, 'individual photo');
  // }
  res.send(req.session.name);
})
module.exports = router;