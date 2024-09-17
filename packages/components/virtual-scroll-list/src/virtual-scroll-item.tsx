import { defineComponent, onMounted, onUpdated, ref } from 'vue'
import { virtualScrollItemEmits, virtualScrollItemProps } from './virtual-scroll-item'

export default defineComponent({
  name: 'M2VirtualScrollItem',
  props: virtualScrollItemProps,
  emits: virtualScrollItemEmits,
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement>()

    const onItemResize = () => {
      emit('item-resize', props.uniqueKey!, rootRef.value?.offsetHeight ?? 0)
    }

    onMounted(onItemResize) // 组件mounted时触发item-resize
    onUpdated(onItemResize) // 组件updated时触发item-resize（dom diff时组件会复用）

    return () => {
      const { component: Comp, dataSource, uniqueKey } = props // setup返回的render函数是响应式的

      return (
        Comp && (
          <div
            ref={rootRef}
            key={uniqueKey}
          >
            <Comp dataSource={dataSource} />
          </div>
        )
      )
    }
  }
})
