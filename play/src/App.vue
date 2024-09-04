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
  <play-panel title="Tree同步加载">
    {{ selectedKeysRef }}
    <m2-tree
      v-model:selected-keys="selectedKeysRef"
      :data="treeData"
      :default-expanded-keys="['40']"
      selectable
      :multiple="true"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    />
  </play-panel>
  <play-panel title="Tree异步加载">
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
import { selectedKeysRef, treeData, treeAsyncData, handleLoad } from './components/tree'
</script>

<style lang="scss">
.play-app__panel {
  margin-bottom: 30px;
}
.play-app__panel-title {
  margin: 0;
}
.play-app__panel-container {
  background-color: antiquewhite;
}
</style>
