import Node from '@/Writer/Node'

export default class largerParagraph extends Node {
  get button() {
    return {
      id: this.name,
      icon: 'quote',
      label: window.panel.$t('coralic.extendedWriter.nodes.largerParagraph'),
      name: this.name
    }
  }

  commands({ type, schema, utils }) {
    return {
      largerParagraph: attrs => utils.toggleBlockType(type, schema.nodes.paragraph, attrs)
    }
  }

  get name() {
    return 'largerParagraph'
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
            return { class: '-larger-paragraph' }
          }
        }
      ],
      toDOM: () => ['div', { class: '-larger-paragraph' }, 0]
    }
  }
}
