import { isNumber, isString } from '@m2-ui/utils'
import type { DefineComponent, ExtractPropTypes, PropType } from 'vue'

export const virtualScrollItemProps = {
  dataSource: {
    type: Object,
    required: true,
    default: () => {}
  },
  uniqueKey: {
    type: [Number, String] as PropType<number | string>,
    required: true
  },
  component: {
    type: Object as PropType<DefineComponent>
  }
} as const

export type VirtualScrollItemProps = ExtractPropTypes<typeof virtualScrollItemProps>

export const virtualScrollItemEmits = {
  'item-resize': (uniqueKey: string | number, offsetHeight: number) =>
    isString(uniqueKey) || isNumber(uniqueKey) || isNumber(offsetHeight)
}
