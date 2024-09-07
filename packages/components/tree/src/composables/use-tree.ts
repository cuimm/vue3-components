import { ref } from 'vue'
import { TreeProps } from '../tree'
import { useTreeCheckbox } from './use-tree-checkbox'
import { useTreeNodes } from './use-tree-nodes'
import { useTreeSelect } from './use-tree-select'
import { useTreeToggle } from './use-tree-toggle'

export const useTree = (props: TreeProps) => {
  const expandedKeysRef = ref(new Set(props.defaultExpandedKeys)) // 默认展开的被拍平后的树结构

  const { flattenTreeNodes, createTreeNodes } = useTreeNodes(props, { expandedKeysRef })
  const { isChecked, isIndeterminate, isDisabled, toggleCheck } = useTreeCheckbox({ flattenTreeNodes })
  const { selectedKeysRef, handleNodeSelect } = useTreeSelect(props)
  const { loadingKeysRef, isExpanded, toggleExpand } = useTreeToggle(props, { expandedKeysRef, createTreeNodes })

  return {
    selectedKeysRef,
    expandedKeysRef,
    loadingKeysRef,
    isChecked,
    isIndeterminate,
    isDisabled,
    flattenTreeNodes,
    createTreeNodes,
    toggleCheck,
    handleNodeSelect,
    isExpanded,
    toggleExpand
  }
}
