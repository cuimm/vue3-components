import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlayPanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <div class="play-app__panel">
        <h1 class="play-app__panel-title">{this.title}</h1>
        <div class="play-app__panel-container">{this.$slots.default && this.$slots.default()}</div>
      </div>
    )
  }
})
