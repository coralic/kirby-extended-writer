// Custom nodes
import writerNodes from '@/plugins/writerNodes'
import LargerParagraph from '@/Nodes/LargerParagraph'

// Custom marks
import writerMarks from '@/plugins/writerMarks'
import Highlight from '@/Marks/Highlight'

// List input with nodes
import ListInput from '@/Input/ListInput.vue'
import listNodes from '@/plugins/listNodes'

// Styles
import '@/index.scss'
import writerTextAlign from './plugins/writerTextAlign'

// Register plugin
window.panel.plugin('coralic/frohberger-writer-nodes', {
  use: [writerNodes, writerMarks, listNodes, writerTextAlign],
  thirdParty: {
    nodes: {
      // Import custom nodes from other plugins
      ...(window.panel.plugins.thirdParty.nodes || {}),

      // Provide class, not an instance of it
      largerParagraph: LargerParagraph
    },
    marks: {
      // Import custom marks from other plugins
      ...(window.panel.plugins.thirdParty.marks || {}),

      // Provide class, not an instance of it
      highlight: Highlight
    }
  },
  components: {
    'k-list-input': ListInput
  }
})
