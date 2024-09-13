import { useProp } from '@m2-ui/hooks'
import { computed, inject } from 'vue'
import { formContextKey } from '../constants'

/** @description 当前组件是否禁用态 */
export const useFormDisabled = () => {
  const disabled = useProp<boolean>('disabled') // 当前组件disabled prop值
  const formContext = inject(formContextKey, undefined) // 表单上下文

  return computed(() => {
    return disabled.value || formContext?.disabled || false
  })
}
