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
      selectable
      :multiple="true"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    >
      <template #default="{ node }"> {{ node.key }} ~~ {{ node.label }} </template>
    </m2-tree>
  </play-panel>
  <play-panel title="Tree异步加载">
    <m2-tree
      :data="treeAsyncData"
      :on-load="handleLoad"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
    >
      <template #default="{ node }"> {{ node.key }} __ {{ node.label }} </template>
    </m2-tree>
  </play-panel>

  <!-- Virtual List -->
  <play-panel title="虚拟滚动">
    <m2-tree
      :data="treeVirtualData"
      :node-padding-left="30"
      key-field="key2"
      label-field="label2"
      children-field="children2"
      :virtual-scroll="true"
      :remain="8"
      :size="30"
    />
  </play-panel>

  <!-- Checkbox -->
  <play-panel title="复选框">
    {{ checked1 }}
    <m2-checkbox
      v-model="checked1"
      label="Option 1"
    >
      北京
    </m2-checkbox>

    {{ checked2 }}
    <m2-checkbox
      v-model="checked2"
      label="Option 2"
      :true-value="100"
      :false-value="200"
      :indeterminate="indeterminate"
    >
      ture=100 false=200
    </m2-checkbox>

    {{ checked3 }}
    <m2-checkbox
      v-model="checked3"
      label="Option 1"
      :disabled="true"
      :true-value="100"
      :false-value="200"
    >
      禁用
    </m2-checkbox>
    <m2-checkbox-group />
  </play-panel>
</template>

<script setup lang="ts">
import { AddCircle, ArrowUndo } from '@vicons/ionicons5'
import PlayPanel from './components/panel'
import { selectedKeysRef, treeData, treeAsyncData, handleLoad, treeVirtualData } from './components/tree'
import { checked1, checked2, checked3, indeterminate } from './components/checkbox'
</script>

<style lang="scss">
.play-app__panel {
  margin-bottom: 30px;
}
.play-app__panel-title {
  margin: 0;
}
.play-app__panel-container {
  background-color: #f0f0f0;
}
</style>
