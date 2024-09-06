import { ref } from 'vue'

export const checked1 = ref(false)
export const checked2 = ref(100)
export const checked3 = ref(true)

export const indeterminate = ref(true)

setTimeout(() => {
  indeterminate.value = false
}, 3000)
