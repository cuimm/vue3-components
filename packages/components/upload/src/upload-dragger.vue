<template>
  <div
    :class="ns.b('dragger')"
    @dragover.prevent="onDragover"
    @drop.prevent="onDrop"
    @dragleave.prevent="onDragleave"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { useFormDisabled } from '@m2-ui/components'
import { uploadDraggerEmits, uploadDraggerProps } from './upload-dragger'

const COMPONENT_NAME = 'M2UploadGrag'
defineOptions({ name: COMPONENT_NAME, inheritAttrs: false })

const ns = useNamespace('upload')
defineProps(uploadDraggerProps)
const emit = defineEmits(uploadDraggerEmits)

const dragover = ref(false)
const disabled = useFormDisabled()

/** @description 拖拉到当前节点上方时 */
const onDragover = () => {
  if (!disabled.value) {
    dragover.value = true
  }
}

/** @description 释放到目标节点时 */
const onDrop = (event: DragEvent) => {
  if (disabled.value) return

  dragover.value = false

  event.stopPropagation()

  const files = Array.from(event.dataTransfer!.files)
  emit('file', files)
}

/** @description 拖拉操作离开当前节点范围时 */
const onDragleave = () => {
  dragover.value = false
}
</script>
