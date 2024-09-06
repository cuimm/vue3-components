import { ExtractPropTypes } from 'vue'

export const checkboxGroupProps = {
  tag: {
    type: String,
    default: 'div'
  }
} as const
export type CheckboxGroupPorps = ExtractPropTypes<typeof checkboxGroupProps>
