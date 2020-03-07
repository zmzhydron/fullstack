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
      smallimglist: [],
      bigPhoto: {},
      currentSmallPhoto: {},
      dynamicComp: '',
      action: 'doggy',
      showzmz: false,
    }
  },
  mounted() {
  },
  methods: {
    likeFn(type = 'up') {
      let { likenum, id } = this.bigPhoto;
      if (type === 'up') {
        likenum = likenum ? likenum + 1 : 1;

      } else {
        likenum = likenum ? likenum - 1 : -1;
      }
      axios.post("/api/UpdateLikes", { id, likenum }).then(val => {
        console.log(val, '~~~~~~~~~~~');
        this.bigPhoto.likenum = val.data.likenum;
      })
    },
    getBigPhoto(obj) {
      axios.post("/api/getBIGPHOTO", { id: obj.id }, {
        // headers: { 'Content-Type': 'blob' },
        // responseType: 'blob',
        // responseType: 'arraybuffer'
      }).then(val => {
        console.log(val, obj);
        var u8a = new Uint8Array(val.data.buffer.data);
        let buffer = [];
        for (let i = 0; i < u8a.length; i++) {
          buffer.push(String.fromCharCode(u8a[i]));
        }
        buffer = buffer.join('');
        let blob = new Blob([buffer]);
        let src = URL.createObjectURL(blob);
        src = 'data:image/png;base64,' + btoa(buffer);
        this.bigPhoto = {
          ...val.data,
          src,
        }
      })
    },
    getSmallPhoto() {
      axios.post("/api/world/getphoto", {}, {
        // headers: { 'Content-Type': 'blob' },
        // responseType: 'blob',
        // responseType: 'arraybuffer'
      }).then(val => {
        val.data.forEach(item => {
          let { name, preview, userName, id } = item;
          let data = preview.data;
          var buffer = [];
          var u8a = new Uint8Array(data);
          for (let i = 0; i < u8a.length; i++) {
            // console.log(String.fromCharCode(u8a[i]));
            buffer.push(String.fromCharCode(u8a[i]));
          }
          buffer = buffer.join('');
          let blob = new Blob([buffer]);
          let src = URL.createObjectURL(blob);
          src = 'data:image/png;base64,' + btoa(buffer);
          this.smallimglist.push({
            src,
            name,
            id,
            userName,
          })
        });
      })
    },
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
      <p>my name is {{nigger.name}} niggerAge:{{nigger.age}} <LUST /></p>
      <div :is="dynamicComp.component" :action="action">
      </div>
      <div className="smallimg">
          <img @click="getBigPhoto(item)" :src="item.src" alt="" className="src" v-for="item of smallimglist" :key="item.id"/>
      </div>
      <button @click="requestComponent">requestComponent</button>
      <button @click="getSmallPhoto">getSmallPhoto</button>
      <div class="bigimgage">
        <p>
          likes: {{bigPhoto.likenum}}
          <button @click="likeFn('up')">++like</button>
          <button @click="likeFn('down')">--like</button>
        </p>
      <img :src="bigPhoto.src" id="bigpptpt" />
      </div>

    </div>
    
  `
})

var instanceOFvUE = new Vue({
  el: "#app",
  template: `<Nigger />`
})

