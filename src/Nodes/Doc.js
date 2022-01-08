import Node from '@/Writer/Node'

export default class Doc extends Node {
  get defaults() {
    return {
      inline: false
    }
  }

  get name() {
    return 'doc'
  }

  get schema() {
    return {
      content: this.options.inline ? 'paragraph+' : 'block+'
    }
  }
}
