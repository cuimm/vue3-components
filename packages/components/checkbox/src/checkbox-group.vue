<template>
  <component
    :is="tag"
    :class="ns.b()"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { checkboxGroupProps } from './checkbox-group'

const ns = useNamespace('checkbox-group')
defineOptions({ name: 'M2CheckboxGroup' })
defineProps(checkboxGroupProps)
</script>
