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
  props: {
    names: {
      type: String,
      default: "zhanwei2"
    },
  },
  data: () => {
    return {};
  },
  template: `
    <h1>我没有位置{{names}}</h1>
  `
}

window.lust = lust;
// let Vue = vue;
Vue.component("Nigger", {
  data: () => {
    return {
      nigger: {
        name: "kendralust",
        pwd: 'PWDOFNIGGER'
      },
      dynamicComp: '',
      action: 'doggy',
      showzmz: false,
    }
  },
  mounted(){
    window.asdf = this;
    console.log(window.asdf, '@@@@@@@@@@@@@@@@@@@@');
  },
  methods: {
    requestComponent() {
      console.log('requestComponent');
      // import(/* webpackChunkName: "shitnigger" */ './comp').then(val => {
      //   console.log(val, '~~~~~!!!~~~~~~')
      // })
      import(/* webpackChunkName: "shitnigger" */ './comp.js').then(val => {
        // Vue.component('ZMZ', val.default);
        this.dynamicComp = {
          name: "ZMZ",
          component: val.default
        }
        // this.showzmz = true;
        // setTimeout(() => {
        // }, 1000);
        // <component :is="dynamicComp"></component>
        console.log(val, '@@@@@@@@@@@@@');
      })
      this.$set(this.nigger, 'age', 32);
      console.log(this.$data);
      console.log(this);
    }
  },
  // <p>my slots :: {{names}}</p>
  components: {
    "NIGA": zhanwei,
    "NIGAA": zhanwei2,
    // /* webpackChunkName: "zmz" */ 表示加载的模块和主模块平级并且叫zmz.build.js,./zmz.js表示模块在项目里的相对路径，用于webpack打包
    LUST: () => import(/* webpackChunkName: "zmz" */ './zmz.js')
  },
  template: `
    <div>
      <h1>my name is {{nigger.name}} niggerAge:{{nigger.age}} <LUST /></h1>
      <div :is="dynamicComp.component" :action="action">
      </div>
      <button @click="requestComponent">requestComponent</button>
    </div>
    
  `
})

var instanceOFvUE = new Vue({
  el: "#app",
  template: `<Nigger />`
})

