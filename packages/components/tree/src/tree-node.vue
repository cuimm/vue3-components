<template>
  <div :class="[ns.b(), ns.is('selected', isSelected), ns.is('disabled', disabled)]">
    <div
      :class="ns.e('content')"
      :style="{ paddingLeft: `${node.level * nodePaddingLeft}px` }"
    >
      <span
        v-if="!node.isLeaf"
        :class="[ns.e('expand-icon'), { expanded: expanded && !node.isLeaf }, ns.is('leaf', node.isLeaf)]"
        @click="handleExpand"
      >
        <m2-icon>
          <m2-switcher v-if="!loading"></m2-switcher>
          <m2-loading v-else></m2-loading>
        </m2-icon>
      </span>
      <div
        :class="ns.e('label')"
        @click="handleLabelClick"
      >
        {{ node.label }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import M2Switcher from '@m2-ui/components/internal-icon/switcher'
import M2Loading from '@m2-ui/components/internal-icon/loading'
import { treeNodeEmitts, treeNodeProps } from './tree-node'
import { computed } from 'vue'

defineOptions({ name: 'm2-tree-node' })

const ns = useNamespace('tree-node')

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)

const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node.key)
})

const loading = computed(() => {
  return props.loadingKeys?.has(props.node.key)
})

/** @description 选中 */
const handleLabelClick = () => {
  if (props.node.disabled) return
  emit('select', props.node)
}

/** @description 切换展开/收起 */
const handleExpand = () => {
  emit('toggle', props.node)
}
</script>
