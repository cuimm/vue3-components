import { type PropType, type ExtractPropTypes } from 'vue'

export type KeyType = string | number

/** @description 用户传入的data类型 */
export interface TreeOption {
  key?: KeyType
  label?: KeyType
  children?: TreeOption[]
  isLeaf?: boolean
  [key: string]: unknown
}

/** @description 对用户传入的data格式化后的类型 */
export interface TreeNode extends Required<TreeOption> {
  level: number
  children: TreeNode[]
  rawValue: TreeOption
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  keyField: {
    type: String,
    default: 'key'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  childrenField: {
    type: String,
    default: 'children'
  }
} as const

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
