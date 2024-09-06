import type { CheckboxProps } from '../checkbox'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxStatus } from './use-checkbox-status'
import { useCheckboxEvent } from './use-checkbox-event'

export const useCheckbox = (props: CheckboxProps) => {
  const { isIndeterminate, isFocused, isDisabled, isChecked } = useCheckboxStatus(props)
  const { model } = useCheckboxModel(props)

  const { handleChange } = useCheckboxEvent(props, { isIndeterminate })

  return {
    model,
    isIndeterminate,
    isFocused,
    isDisabled,
    isChecked,
    handleChange
  }
}
