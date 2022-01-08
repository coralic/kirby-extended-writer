export default function (Vue) {
  const originalWriter = Vue.component('k-writer')

  Vue.component('k-writer', {
    extends: originalWriter,
    components: {
      'k-writer-toolbar': {
        extends: originalWriter.component('k-writer-toolbar'),
        computed: {
          hasVisibleButtons() {
            const nodeButtons = Object.keys(this.nodeButtons)

            return (
              nodeButtons.length > 1 ||
              (nodeButtons.length === 1 &&
                !(
                  nodeButtons.includes('bulletList') ||
                  nodeButtons.includes('paragraph') ||
                  nodeButtons.includes('orderedList')
                ))
            )
          }
        }
      }
    }
  })

  const originalList = Vue.component('k-list-field')
  Vue.component('k-list-field', {
    extends: originalList,
    props: {
      nodes: [Array, Boolean]
    }
  })
}
