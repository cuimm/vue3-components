<template>
  <div :class="[ns.b(), ns.m(type), attrs.class]">
    <!-- line -->
    <div
      v-if="type === 'line'"
      :class="ns.b('bar')"
    >
      <div
        :class="ns.be('bar', 'outer')"
        :style="{ height: `${strokeWidth}px` }"
      >
        <div
          :class="ns.be('bar', 'inner')"
          :style="innerStyle"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, useAttrs } from 'vue'
import { isArray, isFunction, isString } from '@m2-ui/utils'
import { useNamespace } from '@m2-ui/hooks'
import { ProgressColor, progressProps } from './progress'

defineOptions({ name: 'M2Progress', inheritAttrs: false })

const ns = useNamespace('progress')
const props = defineProps(progressProps)
const attrs = useAttrs()

const color = computed(() => {
  return getCurrentColor(props.percentage)
})

const innerStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.percentage}%`,
    animationDuration: `${props.duration}s`,
    backgroundColor: color.value
  }
})

const getFormattedColors = (color: ProgressColor[]) => {
  const span = 100 / color.length
  const formattedColors = color.map((_color, index) => {
    if (isString(_color)) {
      return {
        color: _color,
        percentage: index * span
      }
    }
    return _color
  })
  return formattedColors.sort((a, b) => a.percentage - b.percentage)
}

const getCurrentColor = (percentage: number) => {
  const { color } = props
  if (isFunction(color)) {
    return color(percentage)
  } else if (isArray(color)) {
    const colors = getFormattedColors(color)
    for (const color of colors) {
      if (color.percentage > percentage) {
        return color.color
      }
    }
    return colors[colors.length - 1].color
  } else {
    return color
  }
}
</script>
