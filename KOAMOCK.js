// var Koa = require("koa2");
// var app = new Koa();

// app.use(async (ctx, next) => {
//   console.log(1);
//   await next();
//   console.log('a')
// })

// app.use(async (ctx, next) => {
//   console.log(2);
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("111");
//     }, 3000);
//   })
//   await next();
//   console.log('b')
// })

// app.use(async (ctx, next) => {
//   console.log(3);
//   await next();
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("111");
//     }, 3000);
//   })
//   console.log('c')
// })

// app.listen(3001);





var KOA = {
  use: (fn) => {
    KOA.fns.push(fn)
  },
  obj: {
    name: []
  },
  fns: [],
  run: async () => {
    let index = 0;

    let next = async () => {
      // await
      index++;
      if (KOA.fns[index]) {
        console.log("next action");
        KOA.fns[index](KOA.obj, next);
      }
    }
    try {
      KOA.fns[index](KOA.obj, next);
    } catch (e) {
      console.log(e, '!!!!!!!!!!!!');
    }
  }
}
KOA.use(async (obj, next) => {
  console.log(1)
  obj.name.push('zmz')
  // throw new Error("fuckyou");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("111");
      console.log('000');
    }, 1);
  })
  await next();
  console.log("a");
  obj.name.push('kendralust')
  // console.log(obj.name.join(','));
})
KOA.use(async (obj, next) => {
  console.log(2);
  obj.name.push('is')
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("111");
      console.log('111');
    }, 1);
  })
  await next();
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("111");
  //     console.log('222');
  //   }, 1);
  // })
  console.log('b');
})
KOA.use(async (obj, next) => {
  console.log(3);
  obj.name.push('fucking1')
  // await next("stella");
  console.log('c');
})
// 1 2 111  3 C 222 b a 
async function shitman() {
  console.log(1)
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("shitman");
      console.log('shitman');
    }, 1);
  })
  console.log(2)
}
async function next(){
  console.log(`next`);
  shitman();
}
async function nigger() {
  await next();
  console.log(3);
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("111");
  //     console.log('222');
  //   }, 2000);
  // })
}
nigger().then(val => {
  console.log(`nigger then`, val);
})
// KOA.run();