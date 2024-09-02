import { type ExtractPropTypes, PropType } from 'vue'
import { type TreeNode } from './tree'

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
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
  toggle: (node: TreeNode) => node
}

export type TreeNodeEmitts = typeof treeNodeEmitts
