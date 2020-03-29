var p1 = function (value, id, delay = 500) {
  return new PRO((resolve, reject) => {
    setTimeout((val) => {
      resolve(val)
    }, delay, value);
  }, id)
}
var p2 = function (value, id, delay = 500) {
  return new PRO((resolve, reject) => {
    setTimeout((val) => {
      resolve(val);
    }, delay, value);
  }, id)
}
let index = 0;
class PRO {
  constructor(fn = () => { }, id = 100) {
    /* 
      初始化值
    */
    this.value = null;
    this.id = id;
    this._status = 0;
    this.successFn = "";
    let reject = () => {
    }
    /* 
      调用传递进来的函数，把resolve，reject函数作为参数注册进来
    */
    fn(this.resolve, reject);
  }
  static all(list) {
    return new PRO((resolve, reject) => {
      // 设置每个实例的id。
      let obj = {};
      let indexCount = 0;
      let processList = () => {
        let list = [];
        for (let value of Object.values(obj)) {
          list.push(value);
        }
        return list;
      }
      list.forEach(item => {
        let uniqueId = Math.random() * 1000 + new Date().valueOf();
        if (typeof item === 'object' && item.then && typeof item.then === 'function') {
          // promise 处理
          obj[uniqueId] = '';
          item.then(val => {
            obj[uniqueId] = val;
            indexCount++;
            if (indexCount === list.length) {
              resolve(processList());
            }
          });
        } else {
          // 原始类型
          obj[uniqueId] = item;
          indexCount++;
        }
      })
      if (indexCount === list.length) {
        resolve(processList());
      }
    })
  }
  get status() {
    console.log("read status", this._status);
    return this._status;
  }
  set status(value) {
    if (value !== this._status) {
      // 通过get set 来执行then函数的回调函数;
      if (value === 1) {
        if (this.successFn) {
          /* 
              执行先前执行then储存的回调函数
              如果回调函数返回的是一个promise实例，那么我们就等待这个promise resolve后执行里面then函数的回调函数
              这时候最关键点来了：
              当前promise实例的then函数返回的promise对象（this.successFn)被resolve了
              那么执行其then的回调函数把参数传递给当前then函数返回的promise对象的resolve函数
              这样让下一个then函数的回调函数执行。

          */
          console.log(`这样让下一个then函数的回调函数执行。`, this.id);
          let r = this.successFn(this.value);
          if (!r) {
            // return false;
          }
          if (r instanceof PRO) {
            r.then(val => {
              this.nextPro.resolve(val);
            })
          } else {
            // 如果是非promise函数，那么直接用下一个promise对象执行resolve函数把值传递给then的回调函数。
            this.nextPro.resolve(r);
          }
        }
      }
      // console.log("status change to :::", value, this._status);
      this._status = value;
    }
  }
  resolve = val => {
    /* 
      把传递给resolve函数的值储存起来
    */
    this.value = val;
    /* 
      设置为1，即状态为resolve
      为后面的通过get set读取器操作then的回调函数做判断
    */
    this.status = 1;
    // if (this.successFn) {
    //   /* 
    //       执行先前执行then储存的回调函数
    //       如果回调函数返回的是一个promise实例，那么我们就等待这个promise resolve后执行里面then函数的回调函数
    //       这时候最关键点来了：
    //       当前promise实例的then函数返回的promise对象（this.successFn)被resolve了
    //       那么执行其then的回调函数把参数传递给当前then函数返回的promise对象的resolve函数
    //       这样让下一个then函数的回调函数执行。

    //   */
    //   console.log(`这样让下一个then函数的回调函数执行。`, this.id);
    //   let r = this.successFn(this.value);
    //   if (r instanceof PRO) {
    //     r.then(val => {
    //       this.nextPro.resolve(val);
    //     })
    //   } else {
    //     // 如果是非promise函数，那么直接用下一个promise对象执行resolve函数把值传递给then的回调函数。
    //     this.nextPro.resolve(r);
    //   }
    // }
  }
  then(success, failed) {
    // then函数在PRO实例执行的时候也会执行，这时把then函数的回调注册到PRO中。
    this.successFn = success;
    /* 
      根据promise定义，then函数会返回一个promise实例。
      储存这个promise实例，获得控制下一个promise对象的能力
    */
    this.nextPro = new PRO(() => { }, ++this.id);
    return this.nextPro;
  }
}

// p2("zhangmingzhi").then(val => {
//   console.log(val);
// })

// PRO.all([p1("zmz"), p1("is"), 'the', 'best', p1("nigger", 3000)]).then(val => {
//   console.log("final:::>>>>>>>>>>", val);
// })
var pp = new PRO();
pp.status = 101;
pp.status = 101;
pp.status = 101;
console.log(pp.status);
p1('zmz')
  .then(val => {
    console.log(val, 11);
    return p1(val + " is", 1);
  })
  .then(val => {
    console.log(val, 12);
    return p1(val + " the", 2);
  })
  .then(val => {
    console.log(val, 13);
    // return val + " best";
    return p1(val + " best", 3);
  })
  // .then(val => {
  //   console.log(val, 4);
  //   return val + " nigger";
  //   // return p1(val + " nigger");
  // })
  // .then(val => {
  //   console.log(val, '::::>>>>final');
  // })
// p1('zmz')
//   .then(val => {
//     console.log(val);
//     return p1(val + " is");
//   })
//   .then(val => {
//     console.log(val);
//     return p1(val + " the");
//   })
//   .then(val => {
//     console.log(val);
//     return p1(val + " best");
//   })
//   .then(val => {
//     console.log(val);
//     return p1(val + " nigger");
//   })
//   .then(val => {
//     console.log(val, '::::>>>>final');
//   })