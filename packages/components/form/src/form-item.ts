import type { ExtractPropTypes, PropType } from 'vue'
import type { Arrayable } from '@m2-ui/utils/typescript'
import type { FormItemRule } from './types'

export const formItemValidateState = ['', 'success', 'error', 'validating'] as const
export type FormItemValidateState = (typeof formItemValidateState)[number]

export type FormItemProp = Arrayable<string>

export const formItemProps = {
  prop: {
    type: String
  },
  label: {
    type: String
  },
  rules: {
    type: [Object, Array] as PropType<Arrayable<FormItemRule>>
  },
  showMessage: {
    type: Boolean,
    default: true
  }
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
