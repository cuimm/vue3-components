<template>
  <div
    :class="[ns.b(), ns.is('drag', drag), ns.is('disabled', disabled)]"
    @click="handleWrapperClick"
  >
    <template v-if="drag">
      <m2-upload-dragger
        :disabled="disabled"
        @file="uploadFiles"
      >
        <slot />
      </m2-upload-dragger>
    </template>
    <template v-else>
      <slot></slot>
    </template>
    <input
      ref="inputRef"
      type="file"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      :class="ns.e('input')"
      @change.stop="handleChange"
      @click.stop
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@m2-ui/hooks/use-namespace'
import M2UploadDragger from './upload-dragger.vue'
import { UploadHttpRequestOptions, UploadRawFile } from './types'
import { genFileId } from './upload'
import { uploadContentProps } from './upload-content'

defineOptions({ inheritAttrs: false })

const ns = useNamespace('upload')
const props = defineProps(uploadContentProps)

const inputRef = ref<HTMLInputElement>()

/** @description 封装XmlHttpRequest进行上传文件 */
const doUpload = (rawFile: UploadRawFile) => {
  const { action, method, name, headers, withCredentials, httpRequest, onSuccess, onError, onProgress } = props

  const options: UploadHttpRequestOptions = {
    action,
    method,
    headers,
    filename: name,
    file: rawFile,
    withCredentials,
    onError: event => {
      onError(event, rawFile)
    },
    onSuccess: response => {
      onSuccess(response, rawFile)
    },
    onProgress: event => {
      onProgress(event, rawFile)
    }
  }

  const result = httpRequest(options)
  if (result instanceof Promise) {
    result.then(options.onSuccess).catch(options.onError)
  }
}

/** @description 单上传文件 */
const upload = async (rawFile: UploadRawFile) => {
  inputRef.value!.value = ''

  if (!props.beforeUpload) {
    return doUpload(rawFile)
  }

  // beforeUpload: 处理文件上传前的钩子
  let beforeHookResult
  try {
    beforeHookResult = await props.beforeUpload(rawFile)
  } catch {
    beforeHookResult = false
  }
  if (!beforeHookResult) {
    props.onRemove(rawFile)
    return
  }

  doUpload(rawFile)
}

/** @description 上传文件 */
const uploadFiles = (files: File[]) => {
  if (!files.length) return

  const { fileList, limit, multiple, autoUpload, onStart, onExceed } = props

  // 超出文件限制个数
  if (limit && fileList.length + files.length > limit) {
    onExceed(files, fileList)
    return
  }

  if (!multiple) {
    files = files.slice(0, 1)
  }

  for (const file of files) {
    const rawFile = file as UploadRawFile
    rawFile.uid = genFileId()
    onStart(rawFile)
    if (autoUpload) {
      upload(rawFile)
    }
  }
}

/** @description input的change事件 */
const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  uploadFiles(Array.from(files)) // files是个类数组
}

/** @description 最外容器的点击事件 */
const handleWrapperClick = () => {
  if (!props.disabled) {
    inputRef.value!.value = ''
    inputRef.value?.click()
  }
}
</script>
