import Mark from '@/Writer/Mark'

export default class Highlight extends Mark {
  get button() {
    return {
      icon: 'star',
      label: window.panel.$t('coralic.extendedWriter.nodes.highlight')
    }
  }

  commands() {
    return () => this.toggle()
  }

  get name() {
    return 'highlight'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'mark' }],
      toDOM: (node) => [
        'mark',
        {
          ...node.attrs
        },
        0
      ]
    }
  }
}
