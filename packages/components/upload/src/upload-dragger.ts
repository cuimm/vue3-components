import { ExtractPropTypes } from 'vue'
import type UploadDragger from './upload-dragger.vue'
import { isArray } from '@m2-ui/utils'

export const uploadDraggerProps = {
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type UploadDraggerProps = ExtractPropTypes<typeof uploadDraggerProps>

export const uploadDraggerEmits = {
  file: (files: File[]) => isArray(files)
}
export const UploadDraggerEmits = typeof uploadDraggerEmits

export type UploadDraggerInstance = InstanceType<typeof UploadDragger>
