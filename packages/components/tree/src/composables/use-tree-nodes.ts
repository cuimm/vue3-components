import { computed, ref, watch } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import type { KeyType, TreeNode, TreeOption, TreeProps } from '../tree'

export const useTreeNodes = (
  props: TreeProps,
  { expandedKeysRef }: { expandedKeysRef: Ref<UnwrapRef<Set<KeyType>>> }
) => {
  const treeNodesRef = ref<TreeNode[]>([]) // 格式化后的数结构

  watch(
    () => props.data,
    (data: TreeOption[] | undefined) => {
      if (data) {
        treeNodesRef.value = createTreeNodes(data)
      }
    },
    {
      immediate: true
    }
  )

  /** @description 拍平要展开的树结构【深度遍历】 */
  const formatFlattenTreeNodes = () => {
    const flattedNodes: TreeNode[] = [] // 要拍平的节点
    const treeNodes = treeNodesRef.value // 格式化后的所有的树节点
    const expandedKeys = expandedKeysRef.value // 要展开的keys
    const stack: TreeNode[] = [] // 使用栈结构对树进行遍历

    for (let index = treeNodes.length - 1; index >= 0; --index) {
      stack.push(treeNodes[index])
    }

    while (stack.length) {
      const node = stack.pop()
      if (!node) return
      flattedNodes.push(node)
      if (expandedKeys.has(node.key)) {
        const children = node.children
        if (children) {
          for (let index = children.length - 1; index >= 0; --index) {
            stack.push(children[index])
          }
        }
      }
    }

    return flattedNodes
  }

  /** @description 格式化用户传入的data option */
  const formatTreeOption = (keyField = 'key', labelField = 'label', childrenField = 'children') => {
    return {
      getKey(treeOption: TreeOption) {
        return treeOption[keyField] as string
      },
      getLabel(treeOption: TreeOption) {
        return treeOption[labelField] as string
      },
      getChildren(treeOption: TreeOption) {
        return treeOption[childrenField] as TreeOption[]
      }
    }
  }

  /** @description 格式化用户传入的data */
  const createTreeNodes = (data: TreeOption[], parent?: TreeNode): TreeNode[] => {
    const formattedTreeOption = formatTreeOption(props.keyField, props.labelField, props.childrenField)

    const traversal = (data: TreeOption[], parentNode: TreeNode | null = null) => {
      return data.map(treeOption => {
        const children = formattedTreeOption.getChildren(treeOption) || []

        const treeNode: TreeNode = {
          key: formattedTreeOption.getKey(treeOption),
          label: formattedTreeOption.getLabel(treeOption),
          children: [],
          level: parentNode ? parentNode.level + 1 : 0,
          isLeaf: treeOption.isLeaf ?? children.length === 0, // 用户提供的isLeaf不为null或undefined时，以isLeaf为准，否则判断有没有children
          disabled: !!treeOption.disabled,
          rawNode: treeOption,
          parentKey: parentNode?.key
        }

        if (children.length) {
          treeNode.children = traversal(children, treeNode)
        }
        return treeNode
      })
    }

    const result: TreeNode[] = traversal(data, parent)
    return result
  }

  return {
    createTreeNodes,
    flattenTreeNodes: computed(formatFlattenTreeNodes) // 拍平的树结构,
  }
}

export type TreeNodes = ReturnType<typeof useTreeNodes>
