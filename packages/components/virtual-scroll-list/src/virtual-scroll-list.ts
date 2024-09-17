import { DefineComponent, ExtractPropTypes, PropType } from 'vue'
import VirtualScrollList from './virtual-scroll-list.vue'

export type DataRangeOption = {
  start: number
  end: number
  paddingTop: number
  paddingBottom: number
}

export interface DataSourceItem {
  id: number
  title: string
  desc: string
  index: number
  [key: string]: any
}

export type VirtualOptions = {
  keeps: number
  buffer: number
  estimateSize: number
  uniqueIds: string[]
}

export type UpdataRange = (dataRange: DataRangeOption) => void

export const virtualScrollListProps = {
  /** @description 数据源 */
  dataSources: {
    type: Array as PropType<DataSourceItem[]>,
    required: true,
    default: () => []
  },
  /** @description key */
  dataKey: {
    type: String,
    required: true
  },
  /** @description 默认显示的个数 */
  keeps: {
    type: Number,
    default: 20
  },
  /** @description 默认高度 */
  height: {
    type: Number,
    default: 300
  },
  /** @description 默认展示高度 */
  estimateSize: {
    type: Number,
    default: 80
  },
  /** @description 渲染组件 */
  dataRendererComponent: {
    type: [Object, Function] as PropType<DefineComponent>,
    required: true
  }
} as const

export type VirtualScrollListProps = ExtractPropTypes<typeof virtualScrollListProps>

export type VirtualScrollListInstance = InstanceType<typeof VirtualScrollList>
