import { getCurrentInstance, ref, watch, type ShallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'
import { isFunction } from '@m2-ui/utils/basic'

export interface UseFocusOptions {
  beforeFocus?: (event: FocusEvent) => boolean | undefined
  afterFocus?: () => void
  beforeBlur?: (event: FocusEvent) => boolean | undefined
  afterBlur?: () => void
}

/**
 * 对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
 * 对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
 * 对于其他类型的事件来说，这个属性没有用
 * @param wrapperRef 包裹器
 * @param event 目标元素
 * @returns 包裹器是否失去焦点
 */
function isBlur(wrapperRef: ShallowRef, event: FocusEvent) {
  return !(event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget))
}

export function useFocus<T extends { focus: () => void }>(
  target: ShallowRef<T | undefined>,
  { beforeFocus, afterFocus, beforeBlur, afterBlur }: UseFocusOptions = {}
) {
  const { emit } = getCurrentInstance()!
  const isFocused = ref(false) // 是否获取焦点
  const wrapperRef = ref<HTMLElement>() // 包裹器Ref

  const handleFocus = (event: FocusEvent) => {
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false
    if (cancelFocus || isFocused.value) return
    isFocused.value = true
    emit('focus', event)
    afterFocus?.()
  }

  const handleBlur = (event: FocusEvent) => {
    const cancleBlur = isFunction(beforeBlur) ? beforeBlur(event) : false
    if (cancleBlur || !isBlur(wrapperRef, event)) {
      return
    }
    isFocused.value = false
    emit('blur', event)
    afterBlur?.()
  }

  const handleClick = () => {
    // document.activeElement: 获取当前获取焦点的元素
    // 当前获取焦点的元素为包裹器wrapper下的子元素时，不做处理
    if (wrapperRef.value?.contains(document.activeElement) && wrapperRef.value !== document.activeElement) {
      return
    }

    target.value?.focus()
  }

  // 设置当前wrapper是可以获取焦点的元素，但是点击tab键会忽略焦点。
  // 否则点击wrapper获取到的activeElement可能会是body
  watch(wrapperRef, el => {
    if (el) {
      el.setAttribute('tabindex', '-1')
    }
  })

  // 给包裹器wrapper绑定事件
  useEventListener(wrapperRef, 'focus', handleFocus, true)
  useEventListener(wrapperRef, 'blur', handleBlur, true)
  useEventListener(wrapperRef, 'click', handleClick, true)

  return {
    isFocused,
    wrapperRef,
    handleFocus,
    handleBlur
  }
}
