<template>
  <div :class="ns.b()">
    <div
      :class="ns.e('content')"
      :style="{ paddingLeft: `${node.level * nodePaddingLeft}px` }"
      @click="handleExpand"
    >
      <span
        v-if="!node.isLeaf"
        :class="[ns.e('expand-icon'), { expanded: expanded && !node.isLeaf }, ns.is('leaf', node.isLeaf)]"
      >
        <m2-icon>
          <m2-switcher></m2-switcher>
        </m2-icon>
      </span>
      <span>{{ node.label }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import { treeNodeEmitts, treeNodeProps } from './tree-node'
import M2Switcher from '@m2-ui/components/internal-icon/switcher'

const ns = useNamespace('tree-node')

defineOptions({ name: 'm2-tree-node' })
const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmitts)

const handleExpand = () => {
  emit('toggle', props.node)
}
</script>
