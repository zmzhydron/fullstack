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
  let file = fs.readFileSync(`../fileupload/11.jpg`);
  console.log(file, '$$$$$$$');
  // res.setHeader('Content-Type', 'image/jpeg');
  // res.setHeader('Content-Type', 'blob');
  // res.setHeader("responseType",'blob');
  // res.setHeader('Content-Type', 'arraybuffer');

  let src = path.resolve(__dirname, '../../../fileupload/11.jpg');
  console.log(src);
  // res.sendFile(src);
  res.send(file);
})
module.exports = router;