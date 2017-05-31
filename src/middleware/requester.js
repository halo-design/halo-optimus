import { getCookie, setCookie } from 'UTIL/cookie'
import { errorCodeCheck } from 'CONSTANT/config'
import { ModalError } from 'UTIL/info'
import NProgress from 'nprogress'
import moment from 'moment'
import qs from 'qs'

export const BZ_REQUESTER = Symbol('BZ REQUESTER')

let isError = false

export default store => next => action => {
  const reqAction = action[BZ_REQUESTER]

  if (typeof reqAction === 'undefined') {
    return next(action)
  }
  let { url, body, header, method, dataType, apiName, requestType, error, success } = reqAction

  const actionWith = data => {
    const finalAction = { ...action, ...data }
    delete finalAction[BZ_REQUESTER]
    return finalAction
  }

  const type = requestType || 'K'
  const date = new Date()
  const mmt = moment(date)
  const transId = `AT${Date.now()}`

  let finalHeader = {
    type: type,
    encry: '0',
    channel: 'AT',
    transId: transId,
    channelFlow: transId,
    transCode: url.replace(/(.*\/)*([^.]+).*/ig, '$2'),
    channelDate: mmt.format('YYYYMD'),
    channelTime: mmt.format('Hms'),
    iCIFID: getCookie('iCIFID') || '',
    eCIFID: getCookie('eCIFID') || '',
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    ...header
  }

  if (type === 'J') {
    finalHeader = {
      ...finalHeader,
      'type': 'J',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  let finalBody
  body = body || {}
  if (type === 'K') {
    finalBody = qs.stringify(body)
  } else if (type === 'J') {
    finalBody = JSON.stringify({body, finalHeader})
  } else {
    throw new Error('Unexcept Type!')
  }

  let finalRequest = {
    headers: finalHeader,
    dataType: dataType || 'JSON',
    method: method || 'post'
  }

  if (method === 'GET') {
    url += '?' + finalBody
  } else if (method !== 'HEAD') {
    finalRequest.body = finalBody
  }

  next(actionWith({ type: `[FETCH]: ${apiName}`, url }))

  return fetch(new Request(url, finalRequest))
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => response.ok ? json : Promise.reject(json))
  .then(json => {
    if (typeof success === 'function') {
      success(json)
    } else {
      const { header, body } = json
      const { errorCode } = body
      header.iCIFID ? setCookie('iCIFID', header.iCIFID) : setCookie('iCIFID', body.iCIFID)
      if (errorCode !== '0' && !isError) {
        isError = true
        ModalError({
          title: `请求失败！[${errorCode}]`,
          content: body.errorMsg,
          onOk: onClose => {
            errorCodeCheck(errorCode)
            isError = false
            NProgress.done()
            onClose()
          }
        })
      }
    }
    return next(actionWith({ type: `[SUCCESS]: ${apiName}`, data: json, url }))
  }).catch(json => {
    if (typeof error === 'function') {
      error()
    } else if (!isError) {
      isError = true
      ModalError({
        title: '请求失败！',
        onOk: onClose => {
          isError = false
          NProgress.done()
          onClose()
        }
      })
    }
    return next(actionWith({ type: `[FAILED]: ${apiName}`, data: json, url }))
  })
}

