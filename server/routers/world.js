const express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path")
router.get("/hello", (req, res, next) => {
  res.send("hello world~~");
  try {
  } catch (e) {
    next(e);
  }
})
router.post('/getphoto', (req, res, next) => {
  // let file = fs.readFileSync(`../fileupload/11.jpg`);
  // console.log(file, '$$$$$$$');
  // res.setHeader('Content-Type', 'image/jpeg');
  // res.setHeader('Content-Type', 'blob');
  // res.setHeader("responseType",'blob');
  req.zmzpool.query(`select p.id, p.userId, p.userName, p.addDate, p.likeNum, s.preview from photo p inner join photopreview s where s.id=p.photohash`, (err, r, f) => {
    if (err) {
      console.log(err, '~~~~~~~~~~');
    }
    console.log(r);
    res.send(r);
  });
  // req.zmzSQL(`select * from photo`).then(val => {
  //   let { result, asyncR } = val;
  //   if (asyncR) {
  //     res.send(result.result);
  //   }
  // })
  // res.send("Jaguar's Special Vehicle Operations has transformed this F-PACE into  utility that's ready to pounce on its prey. With a 5.0L Supercharged V8 with 550hp, the F-PACE SVR is sure to put a smile on anyones face, especially with the exhilarating exhaust note");
})
module.exports = router;