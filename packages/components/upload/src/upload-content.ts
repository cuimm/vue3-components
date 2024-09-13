import { ExtractPropTypes, PropType } from 'vue'
import { baseUploadProps, UploadFile, UploadProgressEvent, UploadRawFile } from './types'
import { NOOP } from '@m2-ui/utils'
import { UploadHooks } from './upload'

export const uploadContentProps = {
  ...baseUploadProps,

  beforeUpload: {
    type: Function as PropType<UploadHooks['beforeUpload']>,
    default: NOOP
  },
  onRemove: {
    type: Function as PropType<(file: UploadRawFile | UploadFile, rawFile?: UploadRawFile) => void>,
    default: NOOP
  },
  onStart: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onSuccess: {
    type: Function as PropType<(response: any, rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onProgress: {
    type: Function as PropType<(event: UploadProgressEvent, rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onError: {
    type: Function as PropType<(event: ProgressEvent<XMLHttpRequestEventTarget>, rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onExceed: {
    type: Function as PropType<UploadHooks['onExceed']>,
    default: NOOP
  }
}

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>
