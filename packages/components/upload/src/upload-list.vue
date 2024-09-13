<template>
  <transition-group
    tag="ul"
    :class="ns.b('list')"
  >
    <li
      v-for="(file, index) in files"
      :key="file.uid || file.name"
      :class="ns.be('list', 'item')"
    >
      <slot
        :file="file"
        :index="index"
      >
        <span>{{ file.name }}</span>
      </slot>
    </li>
  </transition-group>
</template>

<script lang="ts" setup>
import { useNamespace } from '@m2-ui/hooks'
import { uploadListProps } from './upload-list'

defineProps(uploadListProps)
const ns = useNamespace('upload')
</script>
