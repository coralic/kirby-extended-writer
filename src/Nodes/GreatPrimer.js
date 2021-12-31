import Node from '../Writer/Node'

export default class GreatPrimer extends Node {
  get button() {
    return {
      id: this.name,
      icon: 'quote',
      label: window.panel.$t('coralic.extendedWriter.nodes.greatPrimer'),
      name: this.name,
    }
  }

  commands({ utils, type }) {
    return {
      greatPrimer: () => utils.setBlockType(type),
    }
  }

  get name() {
    return 'greatPrimer'
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [
        {
          tag: 'div',
          getAttrs: () => {
            return { class: 'great-primer' }
          },
        },
      ],
      toDOM: () => ['div', { class: 'great-primer' }, 0],
    }
  }
}
