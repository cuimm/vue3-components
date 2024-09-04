import { defineComponent, inject, type PropType, type ExtractPropTypes } from 'vue'
import { treeInjectKey, type TreeNode } from './tree'

export const treeNodeContextProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const

export type TreeNodeContextProps = ExtractPropTypes<typeof treeNodeContextProps>

export default defineComponent({
  name: 'M2TreeNodeContext',
  props: treeNodeContextProps,
  render(props: TreeNodeContextProps) {
    const treeContext = inject(treeInjectKey) // 注入父组件provide的数据

    const node = props.node

    if (treeContext && treeContext.slots.default) {
      return treeContext.slots.default({ node: node })
    }

    return node.label
  }
})
