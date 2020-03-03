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
window.lust = lust;

// let Vue = vue;
Vue.component("Nigger", {
  data: () => {
    return {
      niggerName: "zhangmingzhi"
    }
  },
  mounted: () => {
    console.log("@@@@@@@@@@@@");
  },
  components: {
    // /* webpackChunkName: "zmz" */ 表示加载的模块和主模块评级并且叫zmz.build.js,./zmz.js表示模块在项目里的相对路径，用于webpack打包
    LUST: () => import(/* webpackChunkName: "lust" */ './zmz.js')
  },
  template: `
    <h1>my name is {{niggerName}} <LUST /></h1>
  `
})

var instanceOFvUE = new Vue({
  el: "#app",
  template: `<Nigger />`
})

