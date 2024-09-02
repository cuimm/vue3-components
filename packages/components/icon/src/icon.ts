import type { PropType, ExtractPropTypes } from 'vue'

export const iconProps = {
  color: {
    type: String
  },
  size: {
    type: [Number, String] as PropType<number | string>
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
