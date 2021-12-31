import Node from '../Writer/Node'

export default class BlockHeading extends Node {
  get button() {
    return {
      id: this.name,
      icon: 'headline',
      label: window.panel.$t('coralic.extendedWriter.nodes.heading'),
      name: this.name,
    }
  }

  commands({ utils, type }) {
    return {
      blockHeading: () => utils.setBlockType(type),
    }
  }

  get name() {
    return 'blockHeading'
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [
        {
          tag: 'h2',
        },
      ],
      toDOM: () => ['h2', 0],
    }
  }
}
