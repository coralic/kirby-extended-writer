import Doc from '@/Nodes/Doc'

export default class ListDoc extends Doc {
  get defaults() {
    return {
      nodes: ['bulletList', 'orderedList']
    }
  }

  get schema() {
    return {
      content:
        this.options.nodes instanceof Array
          ? this.options.nodes.join('|')
          : 'bulletList|orderedList'
    }
  }
}
