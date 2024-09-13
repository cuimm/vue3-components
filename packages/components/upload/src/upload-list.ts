import { ExtractPropTypes, PropType } from 'vue'
import { UploadFiles } from './types'

export const uploadListProps = {
  files: {
    type: Array as PropType<UploadFiles>,
    default: []
  }
} as const

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
