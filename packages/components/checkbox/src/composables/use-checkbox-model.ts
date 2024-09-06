import { computed, getCurrentInstance, ref } from 'vue'
import { type CheckboxEmits, type CheckboxProps, type CheckboxValueType } from '../checkbox'

export const useCheckboxModel = (props: CheckboxProps) => {
  const instance = getCurrentInstance()!
  const emit: CheckboxEmits = instance.emit

  const modelRef = ref<CheckboxValueType>(false)
  const model = computed<CheckboxValueType>({
    get() {
      return props.modelValue ?? modelRef.value
    },
    set(val) {
      emit('update:modelValue', val)
      modelRef.value = val
    }
  })

  return {
    model
  }
}
