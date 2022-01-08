import Heading from '@/Nodes/Heading'

export default function (Vue) {
  const thirdParty = window.panel.plugins.thirdParty
  if (thirdParty.__nodesInitialized) return

  const customNodes = thirdParty.nodes
  if (!customNodes) return

  const original = Vue.component('k-writer')

  Vue.component('k-writer', {
    extends: original,
    methods: {
      createNodes() {
        const originalNodes = original.options.methods.createNodes
          .call(this)
          .filter(({ name }) => !Object.keys(customNodes).includes(name))

        const nodes = this.filterExtensions(
          Object.entries(customNodes).reduce((acc, [key, Constructor]) => {
            acc[key] = new Constructor()
            return acc
          }, {}),
          this.nodes
        )

        // `heading` node serves as a wildcard for all headings
        // so there is no need to add the level-constrained heading node
        if (this && this.nodes && !this.nodes.includes('heading')) {
          // we check for all levels via regex
          // and add them to an array
          const levels = this.nodes.reduce((acc, node) => {
            const match = node.matchAll(/h([1-6])/gu)?.next()

            if (
              match &&
              match.value &&
              match.value.length > 1 &&
              !acc.includes(match.value[1])
            )
              acc.push(match.value[1])

            return acc
          }, [])

          // if we do have more than one level,
          // push the heading node with the levels
          if (levels.length > 0) nodes.push(new Heading({ levels }))
        }

        return [...originalNodes, ...nodes]
      }
    }
  })

  thirdParty.__nodesInitialized = true
}
