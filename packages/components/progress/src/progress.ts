import { ExtractPropTypes, PropType } from 'vue'
import type Progress from './progress.vue'

export type ProgressColorFn = (percentage: number) => string
export interface ProgressColor {
  color: string
  percentage: number
}

export const progressType = ['line', 'circle'] as const
export type ProgressType = (typeof progressType)[number]

export const progressProps = {
  type: {
    type: String as PropType<ProgressType>,
    default: 'line',
    values: progressType
  },
  percentage: {
    type: Number,
    default: 0,
    validator(val: number): boolean {
      return val >= 0 && val <= 100
    }
  },
  color: {
    type: [String, Function, Array] as PropType<string | ProgressColorFn | ProgressColor[]>
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  width: {
    type: Number,
    default: 126
  },
  duration: {
    type: Number,
    default: 3
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>

export type ProgressInstance = InstanceType<typeof Progress>
