<template>
  <!-- Icon -->
  <play-panel title="Icon">
    <m2-icon
      :size="20"
      color="green"
    >
      <add-circle />
    </m2-icon>
    <m2-icon
      :size="20"
      color="red"
    >
      <arrow-undo />
    </m2-icon>
  </play-panel>

  <!-- Tree -->
  <play-panel title="Tree">
    <!-- 同步加载 -->
    <m2-tree
      :data="treeData"
      :default-expanded-keys="['40']"
      :on-load="handleLoad"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    />
    <!-- 异步加载 -->
    <m2-tree
      :data="treeAsyncData"
      :on-load="handleLoad"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    />
  </play-panel>
</template>

<script setup lang="ts">
import { AddCircle, ArrowUndo } from '@vicons/ionicons5'
import PlayPanel from './components/panel'
import { treeData, treeAsyncData, handleLoad } from './components/tree'
</script>

<style lang="scss">
.play-app__panel {
  margin-bottom: 306x;
}
.play-app__panel-title {
  margin: 0;
}
.play-app__panel-container {
  background-color: antiquewhite;
}
</style>
