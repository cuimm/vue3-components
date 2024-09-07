<template>
  <div :class="ns.b()">
    <template v-if="!virtualScroll">
      <m2-tree-node
        v-for="node in flattenTreeNodes"
        :key="node.key"
        :node="node"
        :expanded="isExpanded(node)"
        :disabled="isDisabled(node)"
        :selected-keys="iSelectedKeysRef"
        :loading-keys="loadingKeysRef"
        :node-padding-left="nodePaddingLeft"
        :show-checkbox="showCheckbox"
        :is-checked="isChecked(node)"
        :is-indeterminate="isIndeterminate(node)"
        @select="handleNodeSelect"
        @toggle="toggleExpand"
        @check="toggleCheck"
      />
    </template>
    <template v-else>
      <m2-virtual-list
        :items="flattenTreeNodes"
        :remain="remain"
        :size="size"
      >
        <template #default="{ node }">
          <m2-tree-node
            :key="node.key"
            :node="node"
            :expanded="isExpanded(node)"
            :disabled="isDisabled(node)"
            :selected-keys="iSelectedKeysRef"
            :loading-keys="loadingKeysRef"
            :node-padding-left="nodePaddingLeft"
            :show-checkbox="showCheckbox"
            :is-checked="isChecked(node)"
            :is-indeterminate="isIndeterminate(node)"
            @select="handleNodeSelect"
            @toggle="toggleExpand"
            @check="toggleCheck"
          />
        </template>
      </m2-virtual-list>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, useSlots, watch } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import M2TreeNode from './tree-node.vue'
import M2VirtualList from '@m2-ui/components/virtual-list'
import {
  treeProps,
  treeEmitts,
  treeInjectKey,
  type TreeNode,
  type TreeOption,
  type KeyType,
  type TreeSlots
} from './tree'

defineOptions({ name: 'M2Tree' })

/** @description 向子组件provide 数据 */
provide(treeInjectKey, {
  slots: useSlots() as TreeSlots
})

const ns = useNamespace('tree')
const props = defineProps(treeProps)
const emit = defineEmits(treeEmitts)

const iSelectedKeysRef = ref<KeyType[]>([])
const treeNodesRef = ref<TreeNode[]>([]) // 格式化后的数结构
const expandedKeysRef = ref(new Set(props.defaultExpandedKeys)) // 默认展开的被拍平后的树结构
const loadingKeysRef = ref(new Set<KeyType>()) // 正在loading的node节点集合
const checkedKeysRef = ref(new Set<KeyType>()) // 选中的节点集合
const indeterminateKeysRefs = ref(new Set<KeyType>()) // 半选的节点集合

const flattenTreeNodes = computed(formatFlattenTreeNodes) // 拍平的树结构

watch(
  () => props.selectedKeys,
  selectedKeys => {
    iSelectedKeysRef.value = selectedKeys
  },
  {
    immediate: true
  }
)

watch(
  () => props.data,
  (data: TreeOption[]) => {
    treeNodesRef.value = createTreeNodes(data)
  },
  {
    immediate: true
  }
)

/** @description 选择节点 */
function handleNodeSelect(node: TreeNode) {
  if (!props.selectable) return

  let keys = Array.from(iSelectedKeysRef.value)

  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      keys.splice(index, 1)
    } else {
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      keys = []
    } else {
      keys = [node.key]
    }
  }

  emit('update:selectedKeys', keys)
}

/** @description 切换折叠/展开 */
function toggleExpand(node: TreeNode) {
  const expandedKeys = expandedKeysRef.value
  if (expandedKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}

/** @description 折叠 */
function collpase(node: TreeNode) {
  expandedKeysRef.value.delete(node.key)
}

/** @description 展开 */
function expand(node: TreeNode) {
  expandedKeysRef.value.add(node.key)

  triggerLoading(node)
}

/** @description 异步加载 */
function triggerLoading(node: TreeNode) {
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

/** @description 通过key查找节点 */
function findNodeByKey(key: KeyType) {
  return flattenTreeNodes.value?.find(node => node.key === key)
}

/** @description 向下递归子节点，查看checkbox选中状态 */
function toggleCheckForChildren(node: TreeNode, isChecked: boolean) {
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
function toggleCheckForParent(node: TreeNode) {
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
      for (let child of children) {
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
function toggleCheck(node: TreeNode, isChecked: boolean) {
  toggleCheckForChildren(node, isChecked)
  toggleCheckForParent(node)
}

/** @description 复选框是否选中 */
function isChecked(node: TreeNode) {
  return checkedKeysRef.value.has(node.key)
}

/** @description 复选框是否半选 */
function isIndeterminate(node: TreeNode) {
  return indeterminateKeysRefs.value.has(node.key)
}

/** @description 节点是否禁用 */
function isDisabled(node: TreeNode) {
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
function createTreeNodes(data: TreeOption[], parent?: TreeNode): TreeNode[] {
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
</script>
