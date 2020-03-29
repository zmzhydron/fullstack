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
    <slot slotname="stockings"></slot>
    </h1>
  </div>
  `
}

export default shitman;