import type { ComputedRef } from 'vue'
import { computed, getCurrentInstance } from 'vue'

export const useProp = <T>(prop: string): ComputedRef<T> => {
  const vm = getCurrentInstance()
  return computed(() => {
    return (vm?.proxy?.$props as any)[prop]
  })
}
