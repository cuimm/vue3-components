import { PropType, SetupContext, SlotsType, VNode, type ExtractPropTypes } from 'vue'
import { TreeNode } from '@m2-ui/components/tree'

export const virtualListProps = {
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true
  },
  remain: {
    type: Number,
    default: 8
  },
  size: {
    type: Number,
    default: 36
  }
} as const
export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>

/** @description M2VirtualList Slots */
export type VirtualListSlots = {
  default?: (props: { node: TreeNode }) => VNode[]
}
/** @description M2VirtualList SetupContext */
export type VirtualListSetupContext = SetupContext<any, SlotsType<VirtualListSlots>>
