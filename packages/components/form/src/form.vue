<template>
  <div :class="ns.b()">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import type { FormContext, FormItemContext } from './types'
import { formContextKey } from './constants'
import { formEmits, formProps } from './form'

defineOptions({ name: 'M2Form' })

const ns = useNamespace('form')
const props = defineProps(formProps)
const emit = defineEmits(formEmits)

/** @description 添加字段 */
const addField = (field: FormItemContext) => {
  console.log('addField', field)
}

const validate = () => {
  console.log('form validate')
}

/** @description Form组件上下文 */
const context: FormContext = reactive({
  ...toRefs(props),
  emit,
  addField
})

/** @description 向子组件提供Form上下文数据 */
provide(formContextKey, context)

defineExpose({
  validate
})
</script>
