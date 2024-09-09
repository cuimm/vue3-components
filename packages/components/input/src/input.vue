<template>
  <div
    :class="[
      ns.b(),
      ns.b('input-group'),
      {
        [ns.bm('input-group', 'prepend')]: $slots.prepend,
        [ns.bm('input-group', 'append')]: $slots.append
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- prepend slot -->
    <div
      v-if="$slots.prepend"
      :class="ns.be('group', 'prepend')"
    >
      <slot name="prepend" />
    </div>
    <div
      ref="wrapperRef"
      :class="wrapperClass"
    >
      <!-- prefix slot -->
      <span
        v-if="$slots.prefix"
        :class="ns.e('prefix')"
      >
        <slot name="prefix" />
      </span>

      <input
        ref="inputRef"
        :type="showPassword ? (passwordVisibleRef ? 'password' : 'text') : type"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :class="ns.e('inner')"
        v-bind="attrs"
        @input="handleInput"
      />

      <!-- suffix slot -->
      <span
        v-if="$slots.suffix && !(showClear && showPwdVisible)"
        :class="ns.e('suffix')"
      >
        <slot name="suffix" />
      </span>

      <!-- clear -->
      <m2-icon
        v-if="showClear"
        :class="[ns.e('icon'), ns.e('clear')]"
        @click="handleClear"
      >
        <m2-close-circle />
      </m2-icon>

      <!-- password -->
      <m2-icon
        v-if="showPwdVisible"
        :class="[ns.e('icon'), ns.e('password')]"
        @click="handlePasswordVisible"
      >
        <component :is="passwordVisibleRef ? M2View : M2Hide" />
      </m2-icon>
    </div>

    <!-- append slot -->
    <div
      v-if="$slots.append"
      :class="ns.be('group', 'append')"
    >
      <component :is="$slots.append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, useAttrs, watch } from 'vue'
import { UPDATE_MODEL_EVENT } from '@m2-ui/constants'
import { IsNil } from '@m2-ui/utils/basic'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { useFocus } from '@m2-ui/hooks/use-focus'
import M2View from '@m2-ui/components/internal-icon/view'
import M2Hide from '@m2-ui/components/internal-icon/hide'
import M2CloseCircle from '@m2-ui/components/internal-icon/close-circle'
import { inputEmits, inputProps } from './input'

defineOptions({
  name: 'M2Input',
  inheritAttrs: false
})

const ns = useNamespace('input')
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const attrs = useAttrs()

const inputRef = ref<HTMLInputElement>()
const passwordVisibleRef = ref(false)
const hoveringRef = ref(false)
const { isFocused: isFocusedRef, wrapperRef } = useFocus(inputRef)

const showPwdVisible = computed(() => {
  return props.showPassword && !props.disabled && !props.readonly && (!!props.modelValue || isFocusedRef.value)
})

const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    props.modelValue &&
    (isFocusedRef.value || hoveringRef.value)
  )
})

const wrapperClass = computed(() => [ns.e('wrapper'), ns.is('focus', isFocusedRef.value)])

const nativeInputValue = computed(() => {
  return IsNil(props.modelValue) ? '' : String(props.modelValue)
})

watch(nativeInputValue, () => setNativeInputValue())

onMounted(() => {
  setNativeInputValue()
})

function setNativeInputValue() {
  const inputEl = inputRef.value
  if (!inputEl || inputEl.value === nativeInputValue.value) return
  inputEl.value = nativeInputValue.value
}

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement

  emit(UPDATE_MODEL_EVENT, value)
  emit('input', value)
  emit('change', value)
}

function handleClear() {
  emit(UPDATE_MODEL_EVENT, '')
  emit('input', '')
  emit('clear')
}

function handlePasswordVisible() {
  passwordVisibleRef.value = !passwordVisibleRef.value
  focus()
}

function handleMouseEnter(event: MouseEvent) {
  hoveringRef.value = true
  emit('mouseenter', event)
}

function handleMouseLeave(event: MouseEvent) {
  hoveringRef.value = false
  emit('mouseleave', event)
}

async function focus() {
  await nextTick()
  inputRef.value?.focus()
}
</script>
