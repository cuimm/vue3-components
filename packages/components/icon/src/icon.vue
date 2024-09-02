<template>
  <i
    :class="ns.b()"
    :style="style"
  >
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { iconProps } from './icon'

defineOptions({ name: 'M2Icon' })

const ns = useNamespace('icon')
const props = defineProps(iconProps)

const style = computed(() => {
  const { color, size } = props
  if (!color || !size) return
  return {
    ...(size ? { fontSize: `${size}px` } : {}),
    ...(color ? { color: color } : {})
  }
})
</script>
