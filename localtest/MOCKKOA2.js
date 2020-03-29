// koa 模拟 2020-3-24
class KOA {
  constructor() {
    this.fns = [];
    this.obj = {};
    this.name = "zhan";
  }
  run() {
    let index = 0;
    let next = async () => {
      index++;
      if (this.fns[index]) {
        this.fns[index](this.obj, next);
      }
    }
    this.fns[index](this.obj, next);
  }
  use(fn) {
    this.fns.push(fn);
  }
}
var koa = new KOA();
console.log(koa.name);
koa.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log('a');
})
koa.use(async (ctx, next) => {
  console.log(2);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(11);
      console.log('222')
    })
  })
  await next();
  console.log('b');
})
koa.use(async (ctx, next) => {
  console.log(3);
  console.log('c');
})
koa.run();