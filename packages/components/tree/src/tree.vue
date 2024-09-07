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
import { treeProps, treeInjectKey, type TreeSlots } from './tree'
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
  loadingKeysRef,
  isChecked,
  isIndeterminate,
  isDisabled,
  flattenTreeNodes,
  toggleCheck,
  handleNodeSelect,
  isExpanded,
  toggleExpand
} = useTree(props)
</script>
