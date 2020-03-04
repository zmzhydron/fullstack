var shitman = {
  props: {
    action: {
      type: String,
      default: 'none'
    }
  },
  data: () => {
    return {
      name: 'stella coxxx'
    }
  },
  template: `
    <h1>{{name}} likes {{action}}</h1>
  `
}

export default shitman;