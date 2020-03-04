console.log("nigger~~~~~~~~~~~~~");
// import _ from "lodash";
import Vue from "vue";
function lust() {
  // import(/* webpackChunkName: "zmz" */ './zmz.js').then(val => {
  //   console.log(val, '~~~~~!!!~~~~~~')
  // })
  import(/* webpackChunkName: "lodash" */ 'lodash').then(val => {
    console.log(val, '~~~~~!!!~~~~~~')
  })
  // import(/* webpackChunkName: "vue" */ 'vue').then(({ default: vue }) => {

  // })
}

var zhanwei = {
  data: () => {
    return {};
  },
  template: `
    <h1>我是占位的</h1>
  `
}
var zhanwei2 = {
  data: () => {
    return {};
  },
  template: `
    <h1>我没有位置</h1>
  `
}

window.lust = lust;
// let Vue = vue;
Vue.component("Nigger", {
  data: () => {
    return {
      niggerName: "zhangmingzhi",
      dynamicComp: '',
      action: 'doggy',
      showzmz: false,
    }
  },
  mounted: () => {
    console.log("@@@@@@@@@@@@");
  },
  methods: {
    requestComponent() {
      console.log('requestComponent');
      // import(/* webpackChunkName: "shitnigger" */ './comp').then(val => {
      //   console.log(val, '~~~~~!!!~~~~~~')
      // })
      import(/* webpackChunkName: "shitnigger" */ './comp.js').then(val => {
        Vue.component('ZMZ', val.default);
        this.dynamicComp = 'ZMZ';
        // this.showzmz = true;
        // setTimeout(() => {
        // }, 1000);
        // <component :is="dynamicComp"></component>
        console.log(val, '@@@@@@@@@@@@@');
      })

      console.log(this);
    }
  },
  components: {
    "NIGA": zhanwei,
    // /* webpackChunkName: "zmz" */ 表示加载的模块和主模块平级并且叫zmz.build.js,./zmz.js表示模块在项目里的相对路径，用于webpack打包
    LUST: () => import(/* webpackChunkName: "zmz" */ './zmz.js')
  },
  template: `
    <div>
      <h1>my name is {{niggerName}} <LUST /></h1>
      <div :is="dynamicComp" :action="action"></div>
      <button @click="requestComponent">requestComponent</button>
    </div>
    
  `
})

var instanceOFvUE = new Vue({
  el: "#app",
  template: `<Nigger />`
})

