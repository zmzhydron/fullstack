const express = require("express");
var router = express.Router();

router.get("/hello", (req, res, next) => {
  res.send("hello world~~");
  try {
  } catch (e) {
    next(e);
  }
})

module.exports = router;