import { getCurrentInstance } from 'vue'
import { CheckboxEmits, CheckboxProps } from '../checkbox'
import { CheckboxStatus } from './use-checkbox-status'

export const useCheckboxEvent = (
  props: CheckboxProps,
  { isIndeterminate }: Pick<CheckboxStatus, 'isIndeterminate'>
) => {
  const { emit }: { emit: CheckboxEmits } = getCurrentInstance()!

  function getLabeledValue(value: string | number | boolean) {
    return [true, props.trueValue].includes(value) ? props.trueValue ?? true : props.falseValue ?? false
  }

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    isIndeterminate.value = false
    emit('change', getLabeledValue(target.checked))
    console.log('handleChange', getLabeledValue(target.checked))
  }

  return {
    handleChange
  }
}
