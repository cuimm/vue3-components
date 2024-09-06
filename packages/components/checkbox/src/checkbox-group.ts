import type { ExtractPropTypes, InjectionKey, PropType, SetupContext, ToRefs, WritableComputedRef } from 'vue'
import { isArray } from '@m2-ui/utils/basic'
import { type CheckboxValueType } from './checkbox'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<CheckboxGroupValueType>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  tag: {
    type: String,
    default: 'div'
  }
} as const

export type CheckboxGroupPorps = ExtractPropTypes<typeof checkboxGroupProps>

/** @description checkbox-group emits */
export const checkboxGroupEmits = {
  'update:modelValue': (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxGroupValueType) => isArray(val)
}

/** @description checkbox-group setup context */
export type CheckboxGroupSetupContext = SetupContext<typeof checkboxGroupEmits>

/** @description checkbox-group emit */
export type CheckboxGroupEmits = CheckboxGroupSetupContext['emit']

/** @description checkbox-group provide value */
export type CheckboxGroupContext = {
  modelValue?: WritableComputedRef<any> // 可写计算属性
  changeEvent?: (...args: any) => any
} & ToRefs<CheckboxGroupPorps>

/** @description checkbox-group provide key */
export const checkboxGroupInjectKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupInjectKey')
