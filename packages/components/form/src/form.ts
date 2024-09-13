import type { ExtractPropTypes, PropType, SetupContext } from 'vue'
import type { Arrayable } from '@m2-ui/utils'
import { isBoolean, isString } from '@m2-ui/utils'
import type { FormItemRule } from './types'

export const formProps = {
  model: {
    type: Object
  },
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (prop: string, isValid: boolean, message: string) =>
    isString(prop) && isBoolean(isValid) && isString(message)
}

export type FormSetupContext = SetupContext<typeof formEmits>
export type FormEmits = FormSetupContext['emit']
