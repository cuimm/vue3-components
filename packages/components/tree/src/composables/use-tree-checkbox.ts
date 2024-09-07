import { ref } from 'vue'
import type { KeyType, TreeNode } from '../tree'
import type { TreeNodes } from './use-tree-nodes'

export const useTreeCheckbox = ({ flattenTreeNodes }: Pick<TreeNodes, 'flattenTreeNodes'>) => {
  const checkedKeysRef = ref(new Set<KeyType>()) // 选中的节点集合
  const indeterminateKeysRefs = ref(new Set<KeyType>()) // 半选的节点集合

  /** @description 通过key查找节点 */
  const findNodeByKey = (key: KeyType) => {
    return flattenTreeNodes?.value?.find(node => node.key === key)
  }

  /** @description 向下递归子节点，查看checkbox选中状态 */
  const toggleCheckForChildren = (node: TreeNode, isChecked: boolean) => {
    if (!node) return
    if (isChecked) {
      indeterminateKeysRefs.value.delete(node.key)
    }
    checkedKeysRef.value[isChecked ? 'add' : 'delete'](node.key)
    const children = node.children
    if (children) {
      children.forEach(child => {
        if (!child.disabled) {
          toggleCheckForChildren(child, isChecked) // 向下递归子节点
        }
      })
    }
  }

  /** @description 向上递归父节点，查看checkbox选中状态 */
  const toggleCheckForParent = (node: TreeNode) => {
    if (!node) return
    if (node.parentKey) {
      const parentNode = findNodeByKey(node.parentKey)
      if (parentNode) {
        const parentKey = parentNode.key
        const checkedKeys = checkedKeysRef.value
        const indeterminateKeys = indeterminateKeysRefs.value

        let allChecked = true
        let hasChecked = false
        const children = parentNode.children
        for (const child of children) {
          if (checkedKeys.has(child.key)) {
            hasChecked = true
          } else if (indeterminateKeys.has(child.key)) {
            allChecked = false
            hasChecked = true
          } else {
            allChecked = false
          }
        }

        if (allChecked) {
          checkedKeys.add(parentKey)
          indeterminateKeys.delete(parentKey)
        } else if (hasChecked) {
          checkedKeys.delete(parentKey)
          indeterminateKeys.add(parentKey)
        }

        toggleCheckForParent(parentNode) // 向上递归父节点
      }
    }
  }

  /** @description 切换checkbox选择状态 */
  const toggleCheck = (node: TreeNode, isChecked: boolean) => {
    toggleCheckForChildren(node, isChecked)
    toggleCheckForParent(node)
  }

  /** @description 节点是否禁用 */
  const isDisabled = (node: TreeNode) => {
    if (!node) return
    if (node.disabled) {
      return true
    }
    if (node.parentKey) {
      const parentNode = findNodeByKey(node.parentKey)
      if (parentNode) {
        if (parentNode.disabled) {
          return true
        } else {
          return isDisabled(parentNode)
        }
      }
    } else {
      return false
    }
  }

  /** @description 复选框是否选中 */
  const isChecked = (node: TreeNode) => {
    return checkedKeysRef.value.has(node.key)
  }

  /** @description 复选框是否半选 */
  const isIndeterminate = (node: TreeNode) => {
    return indeterminateKeysRefs.value.has(node.key)
  }

  return {
    isDisabled,
    isChecked,
    isIndeterminate,
    toggleCheck
  }
}

export type TreeCheckbox = ReturnType<typeof useTreeCheckbox>
