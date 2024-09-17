import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useNamespace } from '@m2-ui/hooks'
import { DataRangeOption, virtualScrollListProps } from './virtual-scroll-list.ts'
import { initVirtual } from './use-handler.ts'
import M2VirtualScrollItem from './virtual-scroll-item.tsx'

export default defineComponent({
  name: 'M2VirtualScrollList',
  props: virtualScrollListProps,
  setup(props) {
    const ns = useNamespace('virtual-scroll-list')
    let virtual: ReturnType<typeof initVirtual>
    const rootRef = ref<HTMLElement>()

    const rangeDataRef = ref<DataRangeOption>()

    /** @description 容器样式 */
    const containerStyle = computed(() => {
      const { paddingTop, paddingBottom } = rangeDataRef.value || {}

      return {
        padding: `${paddingTop}px 0 ${paddingBottom}px`
      }
    })

    /** @description unique ids */
    const uniqueIdsFormDataSources = computed(() => {
      const { dataSources, dataKey } = props
      return dataSources.map(dataSource => dataSource[dataKey])
    })

    /** @description 组件每一项高度变化时 */
    const onItemResize = (uniqueKey: string | number, offsetHeight: number) => {
      // console.log('item resize', uniqueKey, offsetHeight)

      virtual.saveSize(uniqueKey, offsetHeight)
    }

    /** @description 渲染用户自定义的Item组件 */
    const genDataRendererComponent = () => {
      const slots = []

      const { start, end } = rangeDataRef.value! || {}
      const { dataSources, dataKey, dataRendererComponent: DataRendererComponent } = props

      for (let index = start; index <= end; index++) {
        const dataSource = dataSources[index]
        const uniqueKey = dataSource[dataKey]

        if (dataSource && DataRendererComponent) {
          slots.push(
            <M2VirtualScrollItem
              uniqueKey={uniqueKey}
              dataSource={dataSource}
              component={DataRendererComponent}
              onItemResize={onItemResize}
            />
          )
        }
      }
      return slots
    }

    /** @description 更新当前要展示的数据范围 */
    const update = (newRange: DataRangeOption) => {
      rangeDataRef.value = newRange
    }

    /** @description 滚动 */
    const onScroll = () => {
      if (rootRef.value) {
        const offset = rootRef.value.scrollTop
        virtual.handleScroll(offset)
      }
    }

    const installVirtual = () => {
      virtual = initVirtual(
        {
          keeps: props.keeps,
          buffer: Math.round(props.keeps / 3),
          uniqueIds: uniqueIdsFormDataSources.value,
          estimateSize: props.estimateSize
        },
        update
      )
    }

    onBeforeMount(() => {
      installVirtual()
    })

    return () => {
      return (
        <div
          ref={rootRef}
          class={ns.b()}
          style={{ height: `${props.height}px` }}
          onScroll={onScroll}
        >
          <div
            style={containerStyle.value}
            class={ns.e('container')}
          >
            {genDataRendererComponent()}
          </div>
        </div>
      )
    }
  }
})
