<template>
  <component
    :is="tag"
    :class="ns.b()"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, toRefs } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import {
  checkboxGroupEmits,
  checkboxGroupInjectKey,
  checkboxGroupProps,
  type CheckboxGroupValueType
} from './checkbox-group'

const ns = useNamespace('checkbox-group')
defineOptions({ name: 'M2CheckboxGroup' })
const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const modelValue = computed<CheckboxGroupValueType>({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  }
})

async function changeEvent(val: CheckboxGroupValueType) {
  emit('update:modelValue', val)
  await nextTick()
  emit('change', val)
}

/** @description 向子组件传递数据 */
provide(checkboxGroupInjectKey, { ...toRefs(props), modelValue, changeEvent })
</script>
