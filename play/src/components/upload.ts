import { ref } from 'vue'
import axios from 'axios'
import {
  UploadUserFile,
  UploadRawFile,
  UploadFiles,
  UploadFile,
  UploadProps,
  UploadHttpRequestOptions,
  UploadProgressEvent
} from '@m2-ui/components'

export const fileList = ref([{ name: 'cuimm' }])

export const handleBeforeUpload = (rawFile: UploadRawFile) => {
  console.log('【before-upload】文件上传前的钩子')

  return new Promise((resolve, reject) => {
    const { size } = rawFile
    if (size < 340 * 1000) {
      reject('文件必须大于340K')
    }
    resolve(true)
  })
}

// 返回结果不为false的时候会被从已上传列表删除
export const handleBeforeRemove = (uploadFile: UploadFile, uploadFiles?: UploadFiles) => {
  console.log('【beforeRemove】', uploadFile, uploadFiles)

  return Promise.resolve(true)
}

export const onExceed = (files: File[], fileList: UploadUserFile[]) => {
  console.log('【onExceed】文件超出限制个数: ', files, fileList)
}

export const onStart = (rawFile: UploadRawFile) => {
  console.log('【onStart】开始上传: ', rawFile)
}

export const onChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  console.log('【onChange】文件变更: ', uploadFile, uploadFiles)
}

export const onError: UploadProps['onError'] = (error, uploadFile, uploadFiles) => {
  console.error('【onError】上传错误: ', error, uploadFile, uploadFiles)
}

export const onSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  console.log('【onSuccess】上传成功: ', response, uploadFile, uploadFiles)
}

export const onProgress: UploadProps['onProgress'] = (event, uploadFile, uploadFiles) => {
  console.log('【onProgress】上传进度: ', event.percent, uploadFile, uploadFiles)
}

export const httpRequest = ({ file, onProgress }: UploadHttpRequestOptions) => {
  console.log('【http-request】自定义文件上传')

  return axios
    .post(
      'http://localhost:4000/upload',
      { file: file },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: event => {
          const e = event as unknown as UploadProgressEvent
          e.percent = (event.progress || 0) * 100
          onProgress(e)
        }
      }
    )
    .then(res => {
      console.log('【自定义上传】成功', res)
      return res.data
    })
    .catch(error => {
      console.error('【自定义上传】失败：', error)
    })
}
