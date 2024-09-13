import { isUndefined } from '@m2-ui/utils'
import { UploadHttpRequest, UploadProgressEvent } from './types'

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export const ajaxUpload: UploadHttpRequest = option => {
  if (isUndefined(XMLHttpRequest)) {
    throw new Error('XMLHttpRequest is undefined')
  }

  const { action, method, filename, file, headers, withCredentials, onError, onSuccess, onProgress } = option

  const xhr = new XMLHttpRequest()

  if (xhr.upload) {
    xhr.upload.addEventListener('progress', event => {
      const progressEvent = event as UploadProgressEvent
      progressEvent.percent = event.total ? (event.loaded / event.total) * 100 : 0
      onProgress(progressEvent)
    })
  }

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value)
    }
  }

  const formData = new FormData()
  if (option.data) {
    for (const [key, value] of Object.entries(option.data)) {
      formData.append(key, value)
    }
  }
  formData.append(filename, file, file.name)

  xhr.addEventListener('error', error => {
    onError(error)
  })

  xhr.addEventListener('load', event => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(event)
    }
    onSuccess(getBody(xhr))
  })

  xhr.open(method, action, true)

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  xhr.send(formData)

  return xhr
}
