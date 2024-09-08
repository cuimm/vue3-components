<template>
  <button
    :disabled="disabled || loading"
    :type="nativeType"
    :class="buttonClass"
    @click="handleClick"
  >
    <!-- loading -->
    <template v-if="loading">
      <slot
        v-if="$slots.loading"
        name="loading"
      />
      <!-- 将插槽内容当成组件动态渲染 -->
      <!-- <component
        v-if="$slots.loading"
        :is="$slots.loading"
      /> -->
      <m2-icon v-else>
        <m2-loading></m2-loading>
      </m2-icon>
    </template>

    <!-- left icon -->
    <template v-if="!loading && !isRightIcon && $slots.icon">
      <slot name="icon"> </slot>
    </template>

    <!-- default -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>

    <!-- right icon -->
    <template v-if="!loading && isRightIcon && $slots.icon">
      <!-- <slot name="icon"></slot> -->
      <!-- 把插槽里的内容当成组件进行动态渲染 -->
      <component :is="$slots.icon" />
    </template>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import M2Loading from '@m2-ui/components/internal-icon/loading'
import { buttonEmits, buttonProps } from './button'

const ns = useNamespace('button')
defineOptions({ name: 'M2Button', inheritAttrs: false })
const emit = defineEmits(buttonEmits)

const props = defineProps(buttonProps)

const isRightIcon = computed(() => {
  return props.iconPlacement === 'right'
})

const buttonClass = computed(() => {
  return [
    ns.b(),
    ns.m(props.type),
    ns.m(props.size),
    ns.is('disabled', props.disabled),
    ns.is('loading', props.loading),
    ns.is('round', props.round)
  ]
})

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>
