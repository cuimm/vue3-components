import { inject } from 'vue'
import { formItemContextKey } from '../constants'

export const useFormItem = () => {
  const formItemContext = inject(formItemContextKey, undefined)
  return {
    formItemContext
  }
}
