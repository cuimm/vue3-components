import { ref } from 'vue'
import { TreeNode, TreeProps } from '../tree'

export const useTreeToggle = (props: TreeProps) => {
  const expandedKeysRef = ref(new Set(props.defaultExpandedKeys)) // 默认展开的被拍平后的树结构
  const loadingKeysRef = ref(new Set<KeyType>()) // 正在loading的node节点集合

  /** @description 切换折叠/展开 */
  const toggleExpand = (node: TreeNode) => {
    const expandedKeys = expandedKeysRef.value
    if (expandedKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
      collpase(node)
    } else {
      expand(node)
    }
  }

  /** @description 折叠 */
  const collpase = (node: TreeNode) => {
    expandedKeysRef.value.delete(node.key)
  }

  /** @description 展开 */
  const expand = (node: TreeNode) => {
    expandedKeysRef.value.add(node.key)

    triggerLoading(node)
  }

  /** @description 异步加载 */
  const triggerLoading = (node: TreeNode) => {
    // 非叶子节点 且 children不是数组 的节点会被视为未加载的节点
    if (!node.isLeaf && !node.children.length) {
      const loadingKeys = loadingKeysRef.value

      if (!loadingKeys.has(node.key)) {
        loadingKeys.add(node.key)
        const onLoad = props.onLoad
        if (onLoad) {
          onLoad(node.rawNode)
            .then(children => {
              node.rawNode.children = children // 修改原来的节点
              node.children = createTreeNodes(children, node) // 更新自定义的node
            })
            .finally(() => {
              loadingKeys.delete(node.key)
            })
        }
      }
    }
  }

  /** @description 节点是否展开 */
  const isExpanded = (node: TreeNode) => {
    return expandedKeysRef.value.has(node.key)
  }

  return {
    isExpanded,
    expandedKeysRef
  }
}

export type TreeToggle = ReturnType<typeof useTreeToggle>
