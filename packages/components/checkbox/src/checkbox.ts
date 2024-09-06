import { PropType, SetupContext, type ExtractPropTypes } from 'vue'
import { UPDATE_MODEL_EVENT } from '@m2-ui/constants'
import { isBoolean, isNumber, isString } from '@m2-ui/utils/basic'

export type CheckboxValueType = string | number | boolean

export const checkboxProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<CheckboxValueType>,
    default: undefined
  },
  label: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: undefined
  },
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: undefined
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  trueValue: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  falseValue: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  }
} as const
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

/** @description Checkbox emit 事件 */
export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) => isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) => isString(val) || isNumber(val) || isBoolean(val)
}
/** @description Checkbox SetupContext */
export type CheckboxSetupContext = SetupContext<typeof checkboxEmits>

/** @description Checkbox CheckboxEmits */
export type CheckboxEmits = CheckboxSetupContext['emit']
