import { type ExtractPropTypes, PropType } from 'vue'
import { type TreeNode, type KeyType } from './tree'

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    default: false
  },
  loadingKeys: {
    type: Object as PropType<Set<KeyType>>
  },
  nodePaddingLeft: {
    type: Number,
    default: 16
  }
} as const

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node
}

export type TreeNodeEmitts = typeof treeNodeEmitts
