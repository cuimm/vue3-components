<template>
  <div
    class="play-virtual-scroll-list-item"
    :style="{ height: '80px' }"
    :data-index="dataSource.id"
  >
    <h2>{{ dataSource.index }}.{{ dataSource.title }}</h2>
    <p>{{ dataSource.desc }}</p>
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
  font-size: 12px;

  h2 {
    padding: 0;
    margin: 0;
  }
}
</style>
