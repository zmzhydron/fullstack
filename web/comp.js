var shitman = {
  props: {
    action: {
      type: String,
      default: 'none'
    }
  },
  data: () => {
    return {
      name: 'stella coxxx',
      name2: "mingzhi zhang"
    }
  },
  template: `
  <div>
    <h1>
    {{name}} likes {{action}}
    </h1>
    <slot v-bind:names="name2"></slot>
  </div>
  `
}

export default shitman;