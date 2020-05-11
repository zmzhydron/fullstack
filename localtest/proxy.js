// proxy 和 reflect 
// 2020-4-26

var me = {
  name: 'zhangmingzhi@@@@@@@@@@@@@@',
  age: 32
}
var pro = new Proxy(me, {
  get: function (target, name) {
    console.log(target, name);
    return Reflect.get(target,name)
    // return "shit nigger";
  }
})
function kendralust(value = "zmz") {
  return "i have a great ass. kendralust, and i wanna fuck by:" + value;
}
var pp = new Proxy(kendralust, {
  apply: function (target, ctx, value) {
    // return "xixi hahah nigger";
    console.log(value, target, ctx);
    // return Reflect.apply(...[value]);
    return Reflect.apply(target, ctx, [value]);
  }
})
console.log(pro.name);
console.log(pp('zhangmingzhi'));