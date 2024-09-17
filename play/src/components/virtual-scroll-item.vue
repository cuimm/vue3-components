<template>
  <div class="play-virtual-scroll-list-item">
    <h2 :style="{ color: 'red' }">{{ dataSource.index + 1 }}.{{ dataSource.title }}</h2>
    <p class="play-virtual-scroll-list-item__desc">{{ dataSource.desc }}</p>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { DataSourceItem } from '@m2-ui/components'

defineProps({
  dataSource: {
    type: Object as PropType<DataSourceItem>,
    required: true,
    default: () => {}
  }
} as const)
</script>

<style lang="scss">
.play-virtual-scroll-list-item {
  margin-bottom: 50px;
  font-size: 12px;

  h2 {
    padding: 0;
    margin: 0;
  }
}
.play-virtual-scroll-list-item__desc {
  padding: 0;
  margin: 0;
}
</style>
