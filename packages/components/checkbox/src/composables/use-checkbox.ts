import type { CheckboxProps } from '../checkbox'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxStatus } from './use-checkbox-status'
import { useCheckboxEvent } from './use-checkbox-event'

export const useCheckbox = (props: CheckboxProps) => {
  const { model, isLimitExceeded } = useCheckboxModel(props)

  const { isIndeterminate, isFocused, isDisabled, isChecked, actualValue } = useCheckboxStatus(props, {
    model
  })

  const { handleChange } = useCheckboxEvent(props, { isIndeterminate, isLimitExceeded })

  return {
    model,
    actualValue,
    isIndeterminate,
    isFocused,
    isDisabled,
    isChecked,
    handleChange
  }
}
