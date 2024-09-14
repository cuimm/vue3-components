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
        <span :class="ns.be('list', 'name')">{{ file.name }}</span>
        <span
          v-if="file.status === 'uploading'"
          :class="ns.be('list', 'percentage')"
        >
          <m2-progress
            :percentage="file.percentage"
            :stroke-width="2"
          />
        </span>
      </slot>
    </li>
  </transition-group>
</template>

<script lang="ts" setup>
import { useNamespace } from '@m2-ui/hooks'
import M2Progress from '@m2-ui/components/progress'
import { uploadListProps } from './upload-list'

defineProps(uploadListProps)
const ns = useNamespace('upload')
</script>
