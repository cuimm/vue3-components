import { computed, ref, watch } from 'vue'
import type { CheckboxProps } from '../checkbox'
import { isBoolean } from '@m2-ui/utils/basic'

export const useCheckboxStatus = (props: CheckboxProps) => {
  /** @description 是否获取焦点 */
  const isFocused = ref(false)

  /** @description 是否半选 */
  const isIndeterminate = ref(props.indeterminate)

  /** @description 是否禁用 */
  const isDisabled = computed(() => {
    return props.disabled
  })

  /** @description 是否选中 */
  const isChecked = computed(() => {
    const value = props.modelValue

    if (isBoolean(value)) {
      return value
    } else if (value !== null && value !== undefined) {
      return value === props.trueValue
    }
    return !!value
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
    isChecked
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
