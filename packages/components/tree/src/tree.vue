<template>
  <div :class="ns.b()">
    <m2-tree-node
      v-for="node in flattenTreeNodes"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :node-padding-left="nodePaddingLeft"
      @toggle="toggleExpand"
    >
    </m2-tree-node>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { treeProps, type TreeNode, type TreeOption } from './tree'
import M2TreeNode from './tree-node.vue'

const ns = useNamespace('tree')

defineOptions({
  name: 'M2Tree'
})
const props = defineProps(treeProps)

const treeNodesRef = ref<TreeNode[]>([]) // 格式化后的数结构
const expandedKeysRef = ref(new Set(props.defaultExpandedKeys)) // 默认展开的被拍平后的树结构

const flattenTreeNodes = computed(formatFlattenTreeNodes) // 拍平的树结构

watch(
  () => props.data,
  (data: TreeOption[]) => {
    treeNodesRef.value = createTreeNodes(data)
  },
  {
    immediate: true
  }
)

/** @description 切换折叠/展开 */
function toggleExpand(node: TreeNode) {
  const expandedKeys = expandedKeysRef.value
  if (expandedKeys.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}

/** @description 展开 */
function expand(node: TreeNode) {
  expandedKeysRef.value.add(node.key)
}

/** @description 折叠 */
function collpase(node: TreeNode) {
  expandedKeysRef.value.delete(node.key)
}

/** @description 节点是否展开 */
function isExpanded(node: TreeNode) {
  return expandedKeysRef.value.has(node.key)
}

/** @description 拍平要展开的树结构【深度遍历】 */
function formatFlattenTreeNodes() {
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
function formatTreeOption(keyField: string, labelField: string, childrenField: string) {
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
function createTreeNodes(data: TreeOption[]): TreeNode[] {
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
        rawNode: treeOption
      }

      if (children.length) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }

  const result: TreeNode[] = traversal(data)
  return result
}
</script>
