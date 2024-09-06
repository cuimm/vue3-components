<template>
  <label :class="compClass">
    <span :class="spanClass">
      <input
        v-if="trueValue || falseValue"
        v-model="model"
        type="checkbox"
        :disabled="isDisabled"
        :true-value="trueValue"
        :false-value="falseValue"
        :class="ns.e('original')"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @change="handleChange"
      />
      <input
        v-else
        v-model="model"
        type="checkbox"
        :disabled="isDisabled"
        :class="ns.e('original')"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @change="handleChange"
      />
      <span :class="ns.e('inner')"></span>
    </span>
    <span :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { checkboxProps } from './checkbox'
import { useCheckbox } from './composables'

defineOptions({ name: 'M2Checkbox' })

const ns = useNamespace('checkbox')
const props = defineProps(checkboxProps)

const { model, isFocused, isIndeterminate, isDisabled, isChecked, handleChange } = useCheckbox(props)

/** @description 组件最外层class */
const compClass = computed(() => {
  return [ns.b(), ns.is('disabled', isDisabled.value), ns.is('checked', isChecked.value)]
})

/** @description checkbox外层span class */
const spanClass = computed(() => {
  return [
    ns.e('input'),
    ns.is('disabled', isDisabled.value),
    ns.is('checked', isChecked.value),
    ns.is('indeterminate', isIndeterminate.value)
  ]
})
</script>
