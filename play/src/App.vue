<template>
  <!-- Icon -->
  <m2-icon
    :size="20"
    color="green"
  >
    <add-circle />
  </m2-icon>
  <m2-icon
    :size="20"
    color="red"
  >
    <arrow-undo />
  </m2-icon>

  <!-- Tree -->
  <m2-tree :data="treeData" />
</template>

<script setup lang="ts">
import { AddCircle, ArrowUndo } from '@vicons/ionicons5'
import { ref } from 'vue'
import { type TreeOption } from '@m2-ui/components'

const treeData = ref(createTreeData(4)) as unknown as TreeOption[]

/**
 * 模拟m2-tree data
 * @param level 层级数
 * @param parentNode 父级节点
 * @param deepth 深度
 */
function createTreeData(level: number, parentNode = null as TreeOption | null, deepth = 0): TreeOption[] {
  if (level === 0) return []
  const data = new Array(6 - level).fill(0)
  return data.map((_, index) => {
    const key = parentNode?.key ? `${parentNode?.key}_${level}${index}` : `${level}${index}`
    const node: TreeOption = {
      key: key,
      label: `${deepth + 1}层级`,
      children: [],
      deepth: deepth
    }
    node.children = createTreeData(level - 1, node, deepth + 1)
    return node
  })
}
</script>
