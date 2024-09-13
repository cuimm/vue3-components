import type { PropType } from 'vue'
import { ajaxUpload } from './ajax'

/** @description 上传状态	*/
export const uploadStatus = ['ready', 'uploading', 'success', 'fail'] as const
export type UploadStatus = (typeof uploadStatus)[number]

/** @description 上传进度	*/
export type UploadProgressEvent = ProgressEvent & { percent: number }

/** @description 上传的原始文件，在File基础上扩展uid文件唯一标识	*/
export interface UploadRawFile extends File {
  uid: number
}

/** @description 上传文件类型	*/
export interface UploadFile {
  name: string
  size?: number
  type?: string
  percentage?: number
  status: UploadStatus
  uid: number
  url?: string
  response?: unknown
  raw?: UploadRawFile
}

/** @description 上传文件列表	*/
export type UploadFiles = UploadFile[]

/** @description 用户自定义上传文件 */
export type UploadUserFile = Omit<UploadFile, 'uid' | 'status'> & Partial<Pick<UploadFile, 'uid' | 'status'>>

/** @description httpRequest的请求参数	*/
export interface UploadHttpRequestOptions {
  action: string
  method: string
  data?: Record<string, any>
  filename: string
  file: UploadRawFile
  headers: Headers | Record<string, any>
  withCredentials: boolean
  onSuccess: (response: any) => void
  onError: (event: ProgressEvent<XMLHttpRequestEventTarget>) => void
  onProgress: (precent: UploadProgressEvent) => void
}

/** @description httpRequest的方法定义	*/
export type UploadHttpRequest = (options: UploadHttpRequestOptions) => XMLHttpRequest | Promise<unknown>

export const baseUploadProps = {
  /** @description 请求 URL	*/
  action: {
    type: String,
    default: '#'
  },
  /** @description 设置上传请求方法	*/
  method: {
    type: String,
    default: 'post'
  },
  /** @description 设置上传的请求头部	*/
  headers: {
    type: Object as PropType<Headers | Record<string, any>>,
    default: () => {}
  },
  /** @description 接受上传的文件类型	*/
  accept: {
    type: String,
    default: ''
  },
  /** @description 是否支持多选文件	*/
  multiple: {
    type: Boolean,
    default: false
  },
  /** @description 是否禁用上传	*/
  disbaled: {
    type: Boolean,
    default: false
  },
  /** @description 是否启用拖拽上传 */
  drag: {
    type: Boolean,
    default: false
  },
  /** @description 上传的文件字段名	*/
  name: {
    type: String,
    default: 'file'
  },
  /** @description 支持发送 cookie 凭证信息	*/
  withCredentials: {
    type: Boolean,
    default: false
  },
  /** @description 是否显示已上传文件列表	*/
  showFileList: {
    type: Boolean,
    default: true
  },
  /** @description 默认上传文件 */
  fileList: {
    type: Array as PropType<UploadUserFile[]>,
    default: []
  },
  /** @description 是否自动上传文件	*/
  autoUpload: {
    type: Boolean,
    default: true
  },
  /** @description 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求 */
  httpRequest: {
    type: Function as PropType<UploadHttpRequest>,
    default: ajaxUpload
  },
  /** @description 允许上传文件的最大数量 */
  limit: {
    type: Number
  }
} as const
