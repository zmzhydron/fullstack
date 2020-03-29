// async 模拟 2020-3-29

function pro(value, delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(val => {
      resolve(val);
    }, delay, value)
  })
}

function* gen(val) {
  var a = yield pro(val);
  console.log(a, 'a');
  var b = yield pro(a);
  console.log(b, 'b');
}
// var g = gen('zhangmingzhi');
// let r1 = g.next();
// console.log(r1, 'F1');
// let r2 = g.next(`r1.value+"fuckyou"`);
// console.log(r2, 'F1');
// let r3 = g.next(r2.value);
// console.log(r3, 'F1');

function co(gen, initvalue) {

  return new Promise((resolve, reject) => {
    function run(val, g) {
      let { done, value } = g.next(val);
      console.log(aa);
      if (done) {
        resolve(value);
      } else {
        // 判断是否是含有then的对象，如果是当成promise执行
        if (typeof value === 'object' && value.then && typeof value.then === 'function') {
          value.then(val => {
            run(val, g)
          })
        }else {
          // 不是则直接resolve返回
          run(value, g);
        }

      }
    }
    var g = gen(initvalue);
    try{
      run("", g);
    }catch(e){
      reject(e)
    }
  })
}
co(function* shit(value) {
  var f1 = yield pro(value);
  console.log('f1', f1);
  var f2 = yield pro(f1 + " is");
  console.log('f2', f2);
  var f3 = yield pro(f2 + " the");
  console.log('f3', f3);
  var f4 = yield pro(f3 + " best");
  console.log('f4', f4);
  var f5 = yield f4+" nigger";
  console.log(f5);
  var f6 = yield pro(f5 + " of the world", 2000);
  console.log('f6', f6);
  return f6;
}, 'zhangmingzhi').then(val => {
  console.log(val, ' --- then out');
}, val => {
  console.log(`reject by nigger`, val);
})
// new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
// }).then(val => {
//   console.log(val)
// })

pro(`("@@@@@@@@@@@@@@@@@");`,2000).then(val => {
  console.log(val);
})