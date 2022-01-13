export default function (Vue) {
  Vue.component('k-writer', {
    extends: Vue.component('k-writer'),
    props: {
      align: 'left' | 'center' | 'right'
    },
    mounted() {
      this.$el.classList.add('k-writer-text-align-' + (this.align || 'left'))
    }
  })

  Vue.component('k-writer-field', {
    extends: Vue.component('k-writer-field'),
    props: {
      align: 'left' | 'center' | 'right'
    }
  })
}
