import type { PropType, ExtractPropTypes } from 'vue'
import type Icon from './icon.vue'

export const iconProps = {
  color: {
    type: String
  },
  size: {
    type: [Number, String] as PropType<number | string>
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>

export type IconInstance = InstanceType<typeof Icon>
