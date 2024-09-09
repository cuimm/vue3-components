import { ref } from 'vue'

export const input1 = ref('cuimm')

export const handleInputChange = (val: string) => {
  console.log('handleInputChange', val)
}

export const handleInputFocus = (e: Event) => {
  console.log('handleInputFocus', e)
}
export const handleInputBlur = (e: Event) => {
  console.log('handleInputBlur', e)
}
