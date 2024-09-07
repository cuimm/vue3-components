<template>
  <div :class="ns.b()">
    <template v-if="!virtualScroll">
      <m2-tree-node
        v-for="node in flattenTreeNodes"
        :key="node.key"
        :node="node"
        :expanded="isExpanded(node)"
        :disabled="isDisabled(node)"
        :selected-keys="selectedKeysRef"
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
            :selected-keys="selectedKeysRef"
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
import { provide, useSlots } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import M2VirtualList from '@m2-ui/components/virtual-list'
import { treeProps, treeInjectKey, type TreeNode, type TreeSlots } from './tree'
import M2TreeNode from './tree-node.vue'
import { useTree } from './composables'

defineOptions({ name: 'M2Tree' })

/** @description 向子组件provide 数据 */
provide(treeInjectKey, {
  slots: useSlots() as TreeSlots
})

const ns = useNamespace('tree')
const props = defineProps(treeProps)

const {
  selectedKeysRef,
  expandedKeysRef,
  loadingKeysRef,
  isChecked,
  isIndeterminate,
  isDisabled,
  flattenTreeNodes,
  createTreeNodes,
  toggleCheck,
  handleNodeSelect
} = useTree(props)

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

/** @description 节点是否展开 */
function isExpanded(node: TreeNode) {
  return expandedKeysRef.value.has(node.key)
}
</script>
