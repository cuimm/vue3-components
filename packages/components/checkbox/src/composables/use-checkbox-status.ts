import { computed, inject, ref, toRaw, watch } from 'vue'
import { isArray, isBoolean, isUndefined } from '@m2-ui/utils/basic'
import { checkboxGroupInjectKey } from '../checkbox-group'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from './use-checkbox-model'

export const useCheckboxStatus = (props: CheckboxProps, { model }: Pick<CheckboxModel, 'model'>) => {
  const checkboxGroup = inject(checkboxGroupInjectKey, undefined)

  /** @description 是否获取焦点 */
  const isFocused = ref(false)

  /** @description 是否半选 */
  const isIndeterminate = ref(props.indeterminate)

  /** @description checkbox-group下的checkbox是否可选 */
  const isLimitDisabled = computed(() => {
    const min = checkboxGroup?.min?.value
    const max = checkboxGroup?.max?.value
    const selected = checkboxGroup?.modelValue.value.length
    return (
      (!isUndefined(min) && min >= selected && isChecked.value) ||
      (!isUndefined(max) && max <= selected && !isChecked.value)
    )
  })

  /** @description 是否禁用 */
  const isDisabled = computed(() => {
    return props.disabled || checkboxGroup?.disabled.value || isLimitDisabled.value
  })

  /** @description 是否选中（通过checkbox组件model值进行判断） */
  const isChecked = computed(() => {
    const value = model.value

    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      return value.map(toRaw).includes(actualValue.value) // // checkbox-group
    } else if (value !== null && value !== undefined) {
      return value === props.trueValue
    }
    return !!value
  })

  /** @description checkbox绑定的value值 */
  const actualValue = computed(() => {
    return props.value ?? props.label
  })

  /** @description 监控是否半选 */
  watch(
    () => props.indeterminate,
    val => {
      isIndeterminate.value = val
    }
  )

  return {
    isIndeterminate,
    isFocused,
    isDisabled,
    isChecked,
    actualValue
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
