import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

export const model = reactive({
  username: '',
  phone: ''
})

export const formRef = ref<FormInstance>()

export function validate(prop: string, isValid: boolean, message: string) {
  console.error('App validate: ', prop, isValid, message)
}

export function submit() {
  formRef?.value
    ?.validate()
    .then(() => {
      console.log('表单校验成功~~~')
    })
    .catch(error => {
      console.log('******表单校验失败******', error)
    })
}

export function validateUsername() {
  console.log('校验用户名')
  formRef.value
    ?.validateField('username')
    .then(() => {
      console.log('用户名校验: 成功')
    })
    .catch(error => {
      console.log('userna用户名校验: 失败', error)
    })
}
