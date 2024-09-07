import { getCurrentInstance, ref, watch } from 'vue'
import type { TreeNode, TreeProps, KeyType, TreeEmitts } from '../tree'

export const useTreeSelect = (props: TreeProps) => {
  const selectedKeysRef = ref<KeyType[]>([])

  const instance = getCurrentInstance()!
  const emit = instance.emit as unknown as TreeEmitts

  watch(
    () => props.selectedKeys,
    selectedKeys => {
      selectedKeysRef.value = selectedKeys || []
    },
    {
      immediate: true
    }
  )

  /** @description 选择节点 */
  const handleNodeSelect = (node: TreeNode) => {
    if (!props.selectable) return

    let keys = Array.from(selectedKeysRef.value)

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

  return { selectedKeysRef, handleNodeSelect }
}
