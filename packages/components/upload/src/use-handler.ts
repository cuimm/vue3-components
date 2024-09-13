import { useVModel } from '@vueuse/core'
import { UploadFile, UploadFiles, UploadRawFile } from './types'
import { genFileId, UploadProps } from './upload'
import { UploadContentProps } from './upload-content'

export const useHandler = (props: UploadProps) => {
  // useModel可实现双向绑定：v-model:file-list + @emit('upload:file-list', fileList)
  const uploadFiles = useVModel(
    props as Omit<UploadProps, 'fileList'> & { fileList: UploadFiles }, // 将fileList类型从UploadUserFile[]转换为UploadFile[]
    'fileList',
    undefined,
    { passive: true }
  )

  /** @description 从已上传列表获取当前文件 */
  const getUploadFile = (rawFile: UploadRawFile | UploadFile) => {
    return uploadFiles.value.find(file => file.uid === rawFile.uid)
  }

  /** @description uploadContentHook：开始上传 */
  const handleStart: UploadContentProps['onStart'] = rawFile => {
    const uploadFile: UploadFile = {
      name: rawFile.name,
      size: rawFile.size,
      type: rawFile.type,
      percentage: 0,
      status: 'ready',
      uid: rawFile.uid ? rawFile.uid : genFileId(),
      raw: rawFile
    }

    uploadFiles.value.push(uploadFile)
    props.onChange(uploadFile, uploadFiles.value)
  }

  /** @description 从已上传列表移除当前文件 */
  const removeFile = (uploadFile: UploadFile) => {
    uploadFiles.value = uploadFiles.value.filter(file => file.uid !== uploadFile.uid)
  }

  /** @description 移除文件 */
  const doRemove = (uploadFile: UploadFile) => {
    removeFile(uploadFile)
    props.onRemove(uploadFile, uploadFiles.value)
  }

  /** @description uploadHook：移除文件列表文件 */
  const handleRemove: UploadContentProps['onRemove'] = async file => {
    const uploadFile = getUploadFile(file)
    if (!uploadFile) {
      throw new Error('file to be removed not found')
    }

    if (!props.beforeRemove) {
      doRemove(uploadFile)
      return
    }

    // 处理beforeRemove钩子
    let beforeRemoveHookResult
    try {
      beforeRemoveHookResult = await props.beforeRemove(uploadFile, uploadFiles.value)
    } catch {
      beforeRemoveHookResult = false
    }

    if (beforeRemoveHookResult !== false) {
      doRemove(uploadFile)
    }
  }

  /** @description uploadHook：上传进度 */
  const handleProgress: UploadContentProps['onProgress'] = (event, rawFile) => {
    const uploadFile = getUploadFile(rawFile)
    if (!uploadFile) return

    props.onProgress(event, uploadFile, uploadFiles.value)
    uploadFile.status = 'uploading'
    uploadFile.percentage = Math.round(event.percent)
  }

  /** @description uploadHook：上传成功 */
  const handleSuccess: UploadContentProps['onSuccess'] = (response, rawFile) => {
    props.onSuccess(response, rawFile, uploadFiles.value)
    const uploadFile = getUploadFile(rawFile)
    if (!uploadFile) {
      return
    }

    uploadFile.status = 'success'
    uploadFile.response = response
    props.onChange(uploadFile, uploadFiles.value)
  }

  /** @description uploadHook：上传失败 */
  const handleError: UploadContentProps['onError'] = (event, rawFile) => {
    const uploadFile = getUploadFile(rawFile)
    if (!uploadFile) return

    uploadFile.status = 'fail'
    removeFile(uploadFile)
    props.onError(event, uploadFile, uploadFiles.value)
    props.onChange(uploadFile, uploadFiles.value)
  }

  return {
    uploadFiles,
    handleStart,
    handleRemove,
    handleProgress,
    handleSuccess,
    handleError
  }
}
