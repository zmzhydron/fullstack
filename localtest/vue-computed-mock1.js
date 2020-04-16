// 2020-4-16 对vue computed的理解。

get computed >>>>>>>>

  computed get property(){
  let wathcer = getwathcer();
  let value;
  // firsttime ready always true
  if (wathcer.dirty) {
    value = wathcer.evaluate();
  }
  if (Dep.target) {
    //dep注册watcher (computed watcher)
    wather.depend();

  }
  return value;
}
wathcer.evaluate(){
  this.dirty = false;
  return this.get();
}
compute watcher.get(){
  setDeptaget(this);
  // 执行computed函数会读取到computed函数所依赖的data对象的值，这会进入到data的get //property中，并且Dep.target为渲染watcher
  this.getter();
  popTarget();
}
data.value property get(){
  if (Dep.target) {
    dep.depend();
  }
  return value;
}

dep.depend(){
  Dep.target.adddeps(this)
}
watcher.adddeps(dep){
  this.deps.push(dep);
  dep.addsub(this)
}
dep.addsub(wathcer){
  this.subs.push(watcher);
}
watcher.depend(){
  this.deps.foreach(dep => {
    dep.depend();
    // 这时候的Dep.target 是渲染函数，所以在dep.depend函数里，对渲染函数进行了依赖, 所以在data.value的dep的subs里有渲染函数的，有computed函数的
		/*
			dep.depend(){
				Dep.target.adddeps(this)
			}
			watcher.adddeps(dep){
				this.deps.push(dep);
				dep.addsub(this)
			}
		*/
  })
}

set data.value property(){
  dep.notify();
}
dep.notify(){
  this.subs.foreach(watcher => {
    watcher.update();
  })
}
watcher.update(){
  this.get();
}
