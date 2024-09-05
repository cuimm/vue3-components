import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { virtualListProps, type VirtualListProps, type VirtualListSetupContext } from './virtual-list'

export default defineComponent({
  name: 'M2VirtualList',
  props: virtualListProps,
  setup(props: VirtualListProps, setupContext: VirtualListSetupContext) {
    const ns = useNamespace('virtual-list')

    const { slots } = setupContext

    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const state = reactive({
      start: 0,
      end: props.remain
    })
    const scrollOffset = ref(0) // 滚动区域偏移

    /** @description 上方补充的数据 */
    const prevAddition = computed(() => {
      return Math.min(state.start, props.remain)
    })

    /** @description 下方补充的数据 */
    const nextAddition = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })

    /** @description 可视区域数据（仅展示remain条数据的时候，快速滚动的时候上下可能会留白，为解决该问题一般再补充两屏数据） */
    const visibleData = computed(() => {
      return props.items.slice(state.start - prevAddition.value, state.end + nextAddition.value)
    })

    watch(() => props.items, initWrapper)

    onMounted(() => {
      initWrapper()
    })

    /** @description 初始化容器高度 */
    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + 'px' // 最外层高度
      barRef.value!.style.height = props.items.length * props.size + 'px' // 滚动条高度
    }

    /** @description 处理滚动 */
    const handleScroll = () => {
      const scrollTop = wrapperRef.value!.scrollTop
      state.start = Math.floor(scrollTop / props.size) // 滚动之后可视区域开始位置
      state.end = state.start + props.remain // 滚动之后可视区域结束位置

      scrollOffset.value = state.start * props.size - prevAddition.value * props.size
    }

    return () => {
      return (
        <div
          ref={wrapperRef}
          class={ns.b()}
          onScroll={handleScroll}
        >
          {/* 展示滚动条，模拟总长度 */}
          <div
            ref={barRef}
            class={ns.e('scroll-bar')}
          />
          {/* 更新列表可视区域数据，仅展示 remain 条数据 */}
          <div
            class={ns.e('scroll-list')}
            style={{ transform: `translate3d(0, ${scrollOffset.value}px, 0` }}
          >
            {visibleData.value.map(node => slots.default && slots.default({ node }))}
          </div>
        </div>
      )
    }
  }
})
