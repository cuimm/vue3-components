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

/**
 * 思路：
 * 1. 滑动时会记录每一项的高度
 * 2. 最初默认为固定高度，滚动时一旦发现与前面的高度不一致，则为动态高度
 *
 * 计算上下padding：
 * 1. 固定高度
 *    上padding = 开始下标前面的个数 * 每一项的高度
 *    下padding = (数据总数 - 当前展示到的个数) * 每一项的高度
 * 2. 动态高度
 *    上padding = 从0到开始下标的高度累计总和
 *    下padding = (总个数 - 当前显示到的个数) * 预估高度
 *
 * 计算开始滚动下标：
 * 1. 固定高度
 *    开始滚动下标 = 偏移量scrollTop / 每一项的高度
 * 2. 动态高度
 *    开始滚动下标 = 通过<二分查找算法> 找到已经加载的和当前的偏移量最接近的那一项
 */
