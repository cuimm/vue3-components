import { type PropType, type ExtractPropTypes, SetupContext, SlotsType, type InjectionKey, VNode } from 'vue'
import type Tree from './tree.vue'

export type KeyType = string | number

/** @description 用户传入的data类型 */
export interface TreeOption {
  key?: KeyType
  label?: KeyType
  children?: TreeOption[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: unknown
}

/** @description 对用户传入的data格式化后的类型 */
export interface TreeNode extends Required<TreeOption> {
  level: number
  children: TreeNode[]
  rawNode: TreeOption
  parentKey: KeyType | undefined
}

/** @description M2Tree Props */
export const treeProps = {
  selectedKeys: {
    type: Array as PropType<KeyType[]>,
    default: () => []
  },
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  defaultExpandedKeys: {
    type: Array as PropType<KeyType[]>,
    default: () => []
  },
  onLoad: {
    type: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>
  },
  nodePaddingLeft: {
    type: Number,
    default: 16
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
  },
  virtualScroll: {
    type: Boolean,
    default: false
  },
  remain: {
    type: Number,
    default: 8
  },
  size: {
    type: Number,
    default: 36
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultCheckedKeys: {
    type: Array as PropType<KeyType[]>,
    default: () => []
  },
  checkedKeys: {
    type: Array as PropType<KeyType[]>,
    default: () => []
  }
} as const
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

/** @description M2Tree Emit */
export const treeEmitts = {
  'update:selectedKeys': (keys: KeyType[]) => keys,
  'update:checkedKeys': (keys: KeyType[]) => keys
}

/** @description M2Tree Slot */
export type TreeSlots = {
  default: (props: { node: TreeNode }) => VNode[]
}

/** @description M2Tree SetupContext */
export type TreeSetupContext = SetupContext<typeof treeEmitts, SlotsType<TreeSlots>>

export interface TreeContext {
  slots: TreeSetupContext['slots']
  // emits: TreeSetupContext['emit']
}

export type TreeEmitts = TreeSetupContext['emit']

/** @description M2Tree inject key */
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

export type TreeInstance = InstanceType<typeof Tree>
