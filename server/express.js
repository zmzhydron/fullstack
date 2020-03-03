const express = require("express");
const app = new express();
const fs = require("fs");
const mysql = require("mysql")
var cookieParser = require('cookie-parser')
const expressSession = require("express-session");
const COMPS = require('./components/comptest');
var router = express.Router()
var bodyParser = require('body-parser');
var worldRouter = require("./routers/world");
var uploadRouter = require("./routers/upload");
var compression = require('compression');
const SQLCOMP = require("./components/sql");
var path = require("path");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'zmz'
})
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
pool.on(`release`, () => {
  console.log(`connection.release() 释放成功`);
})
// pool.connect(err => {
//   console.log("链接成功mysql!!", SQLCOMP.shitman());
// });

const SQL = SQLCOMP.SQL(pool);
// app.use(compression())
app.use(cookieParser())
app.use((req, res, next) => {
  req.zmzSQL = SQL;
  req.zmzpool = pool;
  next();
})
let src = path.resolve(__dirname, './../web');
console.log(src, '$$$$$$$');

app.use(express.static(src))
app.use(expressSession({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ('name', 'value', { maxAge: 5 * 60 * 1000, secure: false })
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
// parse application/json
app.use(bodyParser.json({ limit: '10mb' }))

router.use((req, res, next) => {
  next();
})
router.post('/api/search', (req, res, next) => {
  let { name, password } = req.body;
  SQL("select * from user").then(val => {
    res.send(val);
  })
});
router.post('/api/register', (req, res, next) => {
  // res.send({
  //   name: req.session.name,
  //   password: req.session.password,
  // });
  // req.session.destroy(() => {
  //   console.log("删除成功!");
  // })
  let { name, password } = req.body;
  // console.log(req.body);
  if (name && password) {
    db.query(`insert into user (name,password) values("${name}", "${password}")`, (err, result, fields) => {
      // console.log(err, result, fields, '~~~~~~~~~~');
      if (result) {

        db.query(`select * from user where name="${name}"`, (err, results, fieldss) => {
          // console.log(err, results, fieldss, `%%%%%%%%%%%%%%%%`);
          if (results && results[0]) {
            // let result = result[0];
            req.session.name = name;
            req.session.userid = results.ID;
            req.session.password = password;
            req.session.createTime = results[0].addDate;
            res.send("成功");
          }

        })
      }
      // res.send(null);
    })
  }
  // next();
})
app.get("/api/doggy", [
  function (req, res, next) {
    fs.readFile("/maybe-valid-file", "utf8", function (err, data) {
      res.locals.data = data;

    });
  },
  function (req, res, next) {
    res.locals.data = res.locals.data.split(",")[1];
    res.send(res.locals.data);
  }
]);
router.get('/api/doggy1', (req, res, next) => {

  next(null);
  fs.readFile("/maybe-valid-file", "utf8", function (err, data) {
  });
})
router.post("/api/login", async (req, res, next) => {
  let { name, password } = req.body;
  if (name && password) {
    SQL(`select * from user where name like '%${name}%'`).then(({ asyncR, result }) => {
      if (asyncR) {
        let r = result.result[0];
        let { password: sqlpass, ID } = r;
        console.log(r, `login`);
        if (password === sqlpass) {
          req.session.name = name;
          req.session.userid = ID;
          req.session.password = password;
          res.send(r);
        }
      }
    })
  }
})
function shitmanlol(req, res, next) {
  // console.log(req.cookies);
  // console.log(req.session.userinfo, req.sessionID, `session`);
  // req.session = null;
  next();
}
function nigger(req, res, next) {
  // res.send("nigger middleware");
  next();
}


app.use(COMPS.setllacox);
app.use(shitmanlol);

app.get('/api/fuckyou', async (req, res, next) => {
  // res.send("fuckyou kendralust~~~~~~");
  let r = await new Promise((resolve, reject) => {
    db.query("select * from pornstart", (err, result, fields) => {
      result.forEach((item, index) => {
      })
      // res.send(result);
      resolve(result);
    })
  })
  res.send(r);
  next();
})
app.use(nigger);
app.use('/', router);
app.use('/api/world', worldRouter);
app.use('/api', uploadRouter);

app.use(function (err, req, res, next) {
  // logic
  console.log(err, '哦喲 報錯了');
})

app.listen(7777, () => {
})