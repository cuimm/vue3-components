<template>
  <m2-upload-content v-bind="uploadContentProps">
    <slot></slot>
  </m2-upload-content>

  <slot name="tip"></slot>

  <m2-upload-list
    v-if="showFileList"
    :files="uploadFiles"
  >
    <template
      v-if="$slots.file"
      #default="{ file, index }"
    >
      <slot
        name="file"
        :file="file"
        :index="index"
      />
    </template>
  </m2-upload-list>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import M2UploadContent from './upload-content.vue'
import M2UploadList from './upload-list.vue'
import type { UploadContentProps } from './upload-content'
import { genFileId, uploadProps } from './upload'
import { useHandler } from './use-handler'

defineOptions({
  name: 'M2Upload',
  inheritAttrs: false
})
const props = defineProps(uploadProps)

const { uploadFiles, handleStart, handleRemove, handleProgress, handleSuccess, handleError } = useHandler(props)

/** @description 传递给uploadContent组件的props */
const uploadContentProps = computed<UploadContentProps>(() => {
  return {
    ...props,
    onStart: handleStart,
    onProgress: handleProgress,
    onSuccess: handleSuccess,
    onError: handleError,
    onRemove: handleRemove
  }
})

/** @description 监控已上传文件uploadFiles */
watch(
  uploadFiles,
  files => {
    for (let file of files) {
      file.uid = file.uid || genFileId()
      file.status = file.status || 'success'
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
