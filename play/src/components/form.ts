import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

export const model = reactive({
  username: '',
  phone: ''
})

export const formRef = ref<FormInstance>()

export function validate(prop: string, isValid: boolean, message: string) {
  console.log('App validate: ', prop, isValid, message)
}

export function submit() {
  formRef?.value?.validate()
}
