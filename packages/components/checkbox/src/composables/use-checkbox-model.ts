import { computed, getCurrentInstance, ref, inject } from 'vue'
import { UPDATE_MODEL_EVENT } from '@m2-ui/constants'
import { isArray, isUndefined } from '@m2-ui/utils/basic'
import { type CheckboxEmits, type CheckboxProps, type CheckboxValueType } from '../checkbox'
import { checkboxGroupInjectKey } from '../checkbox-group'

export const useCheckboxModel = (props: CheckboxProps) => {
  const checkboxGroup = inject(checkboxGroupInjectKey, undefined) // 注入checkbox-group provide的值

  const instance = getCurrentInstance()! // 当前checkbox组件实例
  const emit: CheckboxEmits = instance.emit
  const modelRef = ref<CheckboxValueType>(false)
  const isLimitExceeded = ref(false) // checkbox-group是否超过可选数量限制

  /** @description 是否为checkboxGroup的子组件 */
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)

  /** @description checkbox组件赋值会触发下面的计算属性。当前checkbox如果是checkbox-group的子组件,那么model就是checkbox-group的值. 否则就是check组件的值 */
  const model = computed({
    get() {
      return isGroup.value ? checkboxGroup?.modelValue.value : props.modelValue ?? modelRef.value
    },
    set(val) {
      if (isGroup.value && isArray(val)) {
        // 当前checkbox为checkbox-group的子组件
        isLimitExceeded.value =
          checkboxGroup?.max?.value !== undefined &&
          val.length > checkboxGroup.max.value &&
          val.length > model.value?.length

        if (!isLimitExceeded.value) {
          checkboxGroup?.changeEvent?.(val)
        }
      } else {
        // 单独的checkbox
        emit(UPDATE_MODEL_EVENT, val)
        modelRef.value = val
      }
    }
  })

  return {
    model,
    isGroup,
    isLimitExceeded
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>
