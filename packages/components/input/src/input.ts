import type { ExtractPropTypes, PropType, SetupContext } from 'vue'
import { UPDATE_MODEL_EVENT } from '@m2-ui/constants'
import { isString } from '@m2-ui/utils/basic'

export const inputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (val: string) => isString(val),
  change: (val: string) => isString(val),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  clear: () => true,
  mouseenter: (event: MouseEvent) => event instanceof MouseEvent,
  mouseleave: (event: MouseEvent) => event instanceof MouseEvent
}

export type InputSetupContext = SetupContext<typeof inputEmits>
export type InputEmits = InputSetupContext['emit']
