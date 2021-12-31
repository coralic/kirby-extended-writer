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

        const nodes = Object.entries(customNodes).reduce(
          (acc, [key, Constructor]) => {
            acc[key] = new Constructor()
            return acc
          },
          {}
        )

        return [...originalNodes, ...this.filterExtensions(nodes, this.nodes)]
      },
    },
  })

  thirdParty.__nodesInitialized = true
}
