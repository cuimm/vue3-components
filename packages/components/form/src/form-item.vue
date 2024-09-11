<template>
  <div
    :class="[ns.b(), ns.is('success', validateStateRef === 'success'), ns.is('error', validateStateRef === 'error')]"
  >
    <label :class="ns.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="ns.e('content')">
      <slot></slot>
      <div :class="ns.e('error')">
        <slot name="error">
          {{ validateMessageRef }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, provide, reactive, ref, toRefs } from 'vue'
import AsyncValidator from 'async-validator'
import { isArray, isFunction, castArray, getProp } from '@m2-ui/utils'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { FormItemContext, FormItemRule, FormValidateFailure } from './types'
import { formContextKey, formItemContextKey } from './constants'
import type { FormItemValidateState } from './form-item'
import { formItemProps } from './form-item'

defineOptions({
  name: 'M2FormItem'
})

const formContext = inject(formContextKey)

const ns = useNamespace('form-item')
const props = defineProps(formItemProps)

/** @description 表单项校验状态 */
const validateStateRef = ref<FormItemValidateState>('')
/** @description 表单项校验错误信息 */
const validateMessageRef = ref('')

/** @description 当前表单项的值 */
const fieldValue = computed(() => {
  const model = formContext?.model
  if (!props.prop || !model) return
  return getProp(model, props.prop).value
})

/** @description 格式化rules */
const normalizedRules = computed(() => {
  const rules: FormItemRule[] = []

  // form-item配置的rules
  if (props.rules) {
    rules.push(...castArray(props.rules))
  }

  // 处理form组件提供的rules
  const formRules = formContext?.rules
  if (formRules && props.prop) {
    const _rules = getProp(formRules, props.prop).value
    if (_rules) {
      rules.push(...castArray(_rules))
    }
  }

  return rules
})

/** @description 是否需要进行校验 */
const validateEnabled = computed(() => normalizedRules.value.length > 0)

/** @description 根据trigger过滤当前rules */
const filterRulesByTrigger = (trigger: string) => {
  const rules = normalizedRules.value
  return rules.filter(rule => {
    if (!trigger || !rule.trigger) return true
    if (isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger == trigger
    }
  })
}

/** @description 校验成功 */
const onValidationSucceed = () => {
  setValidationState('success')
  setValidationMessage('')
  formContext?.emit('validate', props.prop!, true, '')
}

/** @description 校验失败 */
const onValidationFailed = (error: FormValidateFailure) => {
  const { errors, fields } = error
  if (!errors || !fields) {
    console.error(errors)
  }
  const errorMsg = errors ? (errors[0] && errors[0].message) ?? '' : ''
  setValidationState('error')
  setValidationMessage(errorMsg)

  formContext?.emit('validate', props.prop!, false, errorMsg) // 触发父级表单的validate
}

/** @description 执行async-validator校验 */
const doValidate = (rules: FormItemRule[]): Promise<true> => {
  const modelName = props.prop ?? ''
  const validator = new AsyncValidator({
    [props.prop!]: rules
  })
  return validator
    .validate({ [modelName]: fieldValue.value }, { firstFields: true })
    .then(() => {
      onValidationSucceed()
      return true as const
    })
    .catch((error: FormValidateFailure) => {
      onValidationFailed(error)
      return Promise.reject(error)
    })
}

/** @description 校验 */
const validate: FormItemContext['validate'] = async (trigger, callback) => {
  if (!validateEnabled.value) {
    callback?.(false)
    return false
  }

  const rules = filterRulesByTrigger(trigger)
  if (rules.length === 0) {
    callback?.(true)
    return true
  }

  setValidationState('validating')

  return doValidate(rules)
    .then(() => {
      callback?.(true)
      return true as const
    })
    .catch((error: FormValidateFailure) => {
      const { fields } = error
      callback?.(false, fields)
      const hasCallback = isFunction(callback)
      return hasCallback ? false : Promise.reject(fields)
    })
}

/** @description 设置校验状态 */
const setValidationState = (state: FormItemValidateState) => {
  validateStateRef.value = state
}

/** @description 设置校验错误信息 */
const setValidationMessage = (message: string) => {
  validateMessageRef.value = message
}

/** @description FormItem组件上下文 */
const context: FormItemContext = reactive({
  ...toRefs(props),
  validate
})

/** @description 向子组件provide FormItem的上下文 */
provide(formItemContextKey, context)
</script>
