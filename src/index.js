// Base
import writerNodes from './plugins/writerNodes'
import writerMarks from './plugins/writerMarks'

// Nodes
import BlockHeading from './Nodes/BlockHeading'
import GreatPrimer from './Nodes/GreatPrimer'

// Marks
import Highlight from './Marks/Highlight'

// Register plugin
window.panel.plugin('coralic/frohberger-writer-nodes', {
  use: [writerNodes, writerMarks],
  thirdParty: {
    nodes: {
      // Import custom nodes from other plugins
      ...(window.panel.plugins.thirdParty.nodes || {}),

      // Provide class, not an instance of it
      blockHeading: BlockHeading,
      greatPrimer: GreatPrimer,
    },
    marks: {
      // Import custom marks from other plugins
      ...(window.panel.plugins.thirdParty.marks || {}),

      // Provide class, not an instance of it
      highlight: Highlight,
    },
  },
})
