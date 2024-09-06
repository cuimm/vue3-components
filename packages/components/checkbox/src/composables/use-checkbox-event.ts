import { getCurrentInstance } from 'vue'
import type { CheckboxEmits, CheckboxProps } from '../checkbox'
import type { CheckboxStatus } from './use-checkbox-status'
import type { CheckboxModel } from './use-checkbox-model'

export const useCheckboxEvent = (
  props: CheckboxProps,
  { isIndeterminate, isLimitExceeded }: Pick<CheckboxStatus, 'isIndeterminate'> & Pick<CheckboxModel, 'isLimitExceeded'>
) => {
  const { emit }: { emit: CheckboxEmits } = getCurrentInstance()!

  function getLabeledValue(value: string | number | boolean) {
    return [true, props.trueValue].includes(value) ? props.trueValue ?? true : props.falseValue ?? false
  }

  /** @description checkbox change event */
  const handleChange = (e: Event) => {
    if (isLimitExceeded.value) return

    isIndeterminate.value = false

    const target = e.target as HTMLInputElement
    emit('change', getLabeledValue(target.checked))
  }

  return {
    handleChange
  }
}

export type CheckboxEvent = ReturnType<typeof useCheckboxEvent>
