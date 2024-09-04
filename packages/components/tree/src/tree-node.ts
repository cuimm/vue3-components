import { type ExtractPropTypes, Prop, PropType } from 'vue'
import { type TreeNode, type KeyType } from './tree'

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<KeyType[]>,
    default: () => []
  },
  loadingKeys: {
    type: Object as PropType<Set<KeyType>>
  },
  expanded: {
    type: Boolean,
    default: false
  },
  nodePaddingLeft: {
    type: Number,
    default: 16
  }
} as const

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export type TreeNodeEmitts = typeof treeNodeEmitts
