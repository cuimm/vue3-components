<template>
  <!-- Icon -->
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

  <!-- Tree -->
  <m2-tree
    :data="treeData"
    :default-expanded-keys="['40', '41']"
    key-field="key2"
    label-field="label2"
    children-field="children2"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AddCircle, ArrowUndo } from '@vicons/ionicons5'
import { type TreeOption } from '@m2-ui/components'
import { createTreeData } from './components/tree'

const treeData = ref(createTreeData(4)) as unknown as TreeOption[]
console.log('treeData: ', createTreeData(4))
</script>
