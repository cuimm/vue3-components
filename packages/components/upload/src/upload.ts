import { ExtractPropTypes, PropType } from 'vue'
import { NOOP } from '@m2-ui/utils'
import type { Awaitable } from '@m2-ui/utils'
import type Upload from './upload.vue'
import { baseUploadProps, UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile, UploadUserFile } from './types'

let fileId = 1
export const genFileId = () => {
  return Date.now() + fileId++
}

export interface UploadHooks {
  beforeUpload: (rawFile: UploadRawFile) => Awaitable<any>
  beforeRemove: (uploadFile: UploadFile, uploadFiles?: UploadFiles) => Awaitable<any>
  onExceed: (files: File[], fileList: UploadUserFile[]) => void
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onSuccess: (response: any, uploadFile: UploadRawFile, uploadFiles: UploadFiles) => void
  onError: (error: ProgressEvent<XMLHttpRequestEventTarget>, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onProgress: (event: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
}

export const uploadProps = {
  ...baseUploadProps,

  /** @description 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传 */
  beforeUpload: {
    type: Function as PropType<UploadHooks['beforeUpload']>,
    default: NOOP
  },
  beforeRemove: {
    type: Function as PropType<UploadHooks['beforeRemove']>,
    default: NOOP
  },
  /** @description 点击文件列表中已上传的文件时的钩子 */
  onPreview: {
    type: Function,
    default: NOOP
  },
  /** @description 文件列表移除文件时的钩子 */
  onRemove: {
    type: Function as PropType<UploadHooks['onRemove']>,
    default: NOOP
  },
  /** @description 文件上传成功时的钩子 */
  onSuccess: {
    type: Function as PropType<UploadHooks['onSuccess']>,
    default: NOOP
  },
  /** @description 文件上传失败时的钩子 */
  onError: {
    type: Function as PropType<UploadHooks['onError']>,
    default: NOOP
  },
  /** @description 文件上传时的钩子 */
  onProgress: {
    type: Function as PropType<UploadHooks['onProgress']>,
    default: NOOP
  },
  /** @description 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 */
  onChange: {
    type: Function as PropType<UploadHooks['onChange']>,
    default: NOOP
  },
  /** @description 当超出限制时，执行的钩子函数 */
  onExceed: {
    type: Function as PropType<UploadHooks['onExceed']>,
    default: NOOP
  }
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadInstance = InstanceType<typeof Upload>
