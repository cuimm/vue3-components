<template>
  <form :class="ns.b()">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, toRefs } from 'vue'
import type { Arrayable } from '@m2-ui/utils'
import { castArray, debugWarn, isFunction } from '@m2-ui/utils'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import type { FormContext, FormItemContext, FormValidateCallback, FormValidationResult } from './types'
import { formContextKey } from './constants'
import { formEmits, formProps } from './form'
import { FormItemProp } from './form-item'
import { ValidateFieldsError } from 'async-validator'

const COMPONENT_NAME = 'M2Form'
defineOptions({ name: COMPONENT_NAME })

const ns = useNamespace('form')
const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const fields: FormItemContext[] = []

/** @description 是否可校验 */
const isValidatable = computed(() => {
  const hasModel = !!props.model
  if (!hasModel) {
    debugWarn(COMPONENT_NAME, 'model is required for validate')
  }
  return hasModel
})

/** @description 添加字段 */
const addField: FormContext['addField'] = field => {
  fields.push(field)
}

/**
 * 过滤表单项
 * @param fields form下所有的表单项上下文集合
 * @param props 要校验的prop
 */
const filterFields = (fields: FormItemContext[], props: Arrayable<FormItemProp>) => {
  const normalizedProps = castArray(props)
  return normalizedProps.length > 0
    ? fields.filter(field => field.prop && normalizedProps.includes(field.prop))
    : fields
}

/** @description 过滤需要校验的表单项 */
const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
  if (fields.length === 0) return []
  const filteredFields = filterFields(fields, props)
  if (!filterFields.length) {
    debugWarn(COMPONENT_NAME, 'please pass correct props')
    return []
  }
  return filteredFields
}

/** @description 验证具体的某个字段 */
const doValidateField = async (props: Arrayable<FormItemProp>) => {
  if (!isValidatable.value) return false

  const fields = obtainValidateFields(props)
  if (!fields.length) return true

  let validationErrors = {}
  for (let field of fields) {
    try {
      await field.validate('')
    } catch (fields) {
      validationErrors = {
        ...validationErrors,
        ...(fields as ValidateFieldsError)
      }
    }
  }

  if (!Object.keys(validationErrors).length) return true
  return Promise.reject(validationErrors)
}

/** @description 验证具体的某个字段 */
const validateField = async (modelProps = [], callback?: FormValidateCallback) => {
  try {
    const result = await doValidateField(modelProps)
    if (result === true) {
      await callback?.(true)
    }
    return result
  } catch (error) {
    const invalidFields = error as ValidateFieldsError // { username: [message: '', fieldValue: '', field: ''], phone: [...] }
    await callback?.(false, invalidFields)
    return !isFunction(callback) && Promise.reject(invalidFields)
  }
}

/** @description 对整个表单进行校验 */
const validate = async (callback?: FormValidateCallback): FormValidationResult => {
  return validateField(undefined, callback)
}

/** @description 清理某个字段的表单验证信息 */
const clearValidate = (props: Arrayable<FormItemProp> = []) => {
  const filteredFields = filterFields(fields, props)
  filteredFields.forEach(field => field.clearValidate())
}

/** @description Form组件上下文 */
const context: FormContext = reactive({
  ...toRefs(props),
  emit,
  addField,
  clearValidate
})

/** @description 向子组件提供Form上下文数据 */
provide(formContextKey, context)

/** @description Form expose */
defineExpose({
  validate,
  validateField,
  clearValidate
})
</script>
