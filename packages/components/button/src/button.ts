import type { ExtractPropTypes, PropType, SetupContext } from 'vue'
import type Button from './button.vue'

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info', ''] as const
export type ButtonTypes = (typeof buttonTypes)[number]

export const buttonSize = ['', 'default', 'small', 'large'] as const
export type ButtonSize = (typeof buttonSize)[number]

export const nativeType = ['button', 'submit', 'reset'] as const
export type NativeType = (typeof nativeType)[number]

export const iconPlacement = ['left', 'right', ''] as const
export type IconPlacement = (typeof iconPlacement)[number]

export const buttonProps = {
  type: {
    type: String as PropType<ButtonTypes>,
    default: '',
    validator(val: ButtonTypes) {
      return buttonTypes.includes(val)
    }
  },
  size: {
    type: String as PropType<ButtonSize>,
    values: buttonSize,
    default: '',
    validator(val: ButtonSize) {
      return buttonSize.includes(val)
    }
  },
  round: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  nativeType: {
    type: String as PropType<NativeType>,
    values: nativeType,
    default: 'button',
    validator(val: NativeType) {
      return nativeType.includes(val)
    }
  },
  iconPlacement: {
    type: String as PropType<IconPlacement>,
    values: iconPlacement,
    default: 'left',
    validator(val: IconPlacement) {
      return iconPlacement.includes(val)
    }
  }
}
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
}

export type ButtonContextSetup = SetupContext<typeof buttonEmits>
export type ButtonEmits = ButtonContextSetup['emit']

export type ButtonInstance = InstanceType<typeof Button>
