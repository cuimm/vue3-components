<template>
  <div :class="ns.b()">tree</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { treeProps, type TreeNode, type TreeOption } from './tree'

defineOptions({
  name: 'M2Tree'
})

const ns = useNamespace('tree')
const props = defineProps(treeProps)

const treeNodes = ref<TreeNode[]>([])

watch(
  () => props.data,
  (data: TreeOption[]) => {
    treeNodes.value = createTreeNodes(data)
  },
  {
    immediate: true
  }
)
console.log(treeNodes.value)

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
        rawValue: treeOption
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
