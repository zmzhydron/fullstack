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
var multerInstance = multer({ storage: memoryStorage, fileFilter })
router.post('/upload', multerInstance.array('photos'), async (req, res, next) => {
  let insertList = [];
  let existList = [];
  let photoBufferList = [];
  for (let file of req.files) {
    let { originalname, mimetype: type, size, buffer } = file;
    hash.update(file.buffer);
    let hashname = hash.digest('hex');
    hash = crypto.createHash('sha1')
    console.log(hashname.length, '~~~~~~~~~~~', hashname);
    // // SQL 查询mysql
    let photoBuffer = await new Promise((resolve, reject) => {
      gm(buffer)
        .resize(200, 200)
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
    // 说明可以插入,先写入文件再插入记录，避免写入文件失败，但是sql执行成功的情况
    if (asyncR) {
      let r = result.result[0];
      if (!r) {
        //       originalname: '新建文本文档.txt',
        //         encoding: '7bit',
        //           mimetype: 'text/plain',
        // size: 139
        console.log(photoBuffer);
        let { userid, name } = req.session;
        let newname = new Date().valueOf().toString().substr(0, 5) + originalname;
        fs.writeFileSync(path.resolve(__dirname, '../../../fileupload/' + newname), buffer);
        // insertList.push({
        //   preview: photoBuffer,
        //   photohash: hashname,
        //   userId: userid,
        //   originalname,
        //   userName: name,
        //   name: newname,
        //   size: size,
        //   type: type
        // })
        photoBufferList.push([hashname, photoBuffer]);
        insertList.push([
          // photoBuffer,
          hashname,
          userid,
          originalname,
          name,
          newname,
          size,
          type
        ])
      } else {
        console.log("已经存在~~~", originalname);
        existList.push(originalname);
      }
    }
  }
  var query1 = "insert into photo (`photohash`,`userId`,`originalname`,`userName`,`name`,`size`,`type`) VALUES ?";
  req.zmzpool.query(query1, [insertList], (err, r, f) => {
    if (err) {
      console.log(err, '~~~~~~~~~~');
    }
    console.log(r, '@@@@@@@@@@@@@');
    res.send("上传成功，成功个数：", insertList.length, "没上传成功的有：", existList.join(','));
  })
  var query2 = "insert into photopreview(`id`,`preview`) VALUES ?"
  req.zmzpool.query(query2, [photoBufferList], (err, r, f) => {
    if (err) {
      console.log(err, '~~~~~~~~~~');
    }
    // console.log(r, '@@@@@@@@@@@@@');
    // res.send("上传成功，成功个数：", insertList.length, "没上传成功的有：", existList.join(','));
  })
})
router.post("/getBIGPHOTO", (req, res, next) => {
  // let rone = await req.zmzSQL(`select * from photo where photohash='${hashname}'`);
  let { id } = req.body;
  req.zmzpool.query(`select * from photo where id=${id}`, (err, r, f) => {
    if (err) {
      console.log(err, '~~~~~~~~~~');
    }
    let src = path.resolve(__dirname, '../../../fileupload/' + r[0].name)
    console.log(r[0].name, src)
    fs.readFile(src, (err, buff) => {
      console.log(buff);
      res.send({
        ...r[0],
        buffer: buff
      });
    })

  })
})
router.post("/UpdateLikes", (req, res, next) => {
  let { id, likenum } = req.body;
  req.zmzpool.query(`update photo set likenum=${likenum} where id=${id}`, (err, r, f) => {
    if (err) {
      console.log(err, '~~~~~~~~~~');
    }
    res.send({
      likenum
    });
  })

})

module.exports = router;