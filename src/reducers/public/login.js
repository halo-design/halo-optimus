import { delCookies, setCookie } from 'UTIL/cookie'
import NProgress from 'nprogress'
import { MsgError } from 'UTIL/info'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { setSessionIDAction, loginAction, logoutAction } from '../fetch/login'

export const LOGONIN = 'LOGONIN'
export const LOGONOUT = 'LOGONOUT'
export const SETSESSIONID = 'SETSESSIONID'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const setSesionIdOP = icifid => {
  const checkCodeSrc = `${API.GET_CHECKCODE_URL}?nocache=${Date.now()}&iCIFID=${icifid}`
  return {
    type: SETSESSIONID,
    data: {
      iCIFID: icifid,
      checkCodeSrc
    }
  }
}

export const setSessionID = () => (dispatch, getState) => {
  delCookies(['cstName', 'iCIFID', 'eCIFID'])
  dispatch(setSessionIDAction()).then(action => {
    const { header, body } = action.data
    if (header.iCIFID) {
      setCookie('iCIFID', header.iCIFID)
      dispatch(setSesionIdOP(header.iCIFID))
    } else {
      setCookie('iCIFID', body.iCIFID)
      dispatch(setSesionIdOP(body.iCIFID))
    }
  })
}

export const loginOP = data => ({
  type: LOGONIN,
  data
})

export const logoutOP = () => ({
  type: LOGONOUT
})

export const loginFailed = () => ({
  type: LOGIN_FAIL
})

export const logout = () => (dispatch, getState) => {
  dispatch(logoutAction())
  dispatch(logoutOP())
}

// 验证登陆
export const validateLogin = (data, success, fail) => (dispatch, getState) => {
  const newData = {
    loginName: data.userName,
    loginPassword: md5(data.pswd.toString()),
    isLogin: data.isLogin,
    validateCodeText: data.vcode
  }
  dispatch(loginAction(newData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    if (dataBody.result === '1') {
      setCookie('eCIFID', dataBody.cstNo)
      setCookie('cstName', dataBody.cstName)
      dispatch(loginOP(dataBody.cstName))
      if (success) {
        success()
      }
    } else {
      dataBody.errorMsg
      ? MsgError(dataBody.errorMsg)
      : MsgError('登录信息有误！')
      dispatch(loginFailed())
      dispatch(setSessionID())
      if (fail) fail()
    }
  })
}

const initialState = {
  isLogin: 'false',
  iCIFID: '',
  time: '',
  cstname: '',
  checkCodeSrc: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGONIN:
      return {
        ...state,
        isLogin: 'true',
        cstname: action.data
      }
    case LOGONOUT:
      return {
        ...state,
        isLogin: 'false'
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLogin: 'FAILED',
        time: Date.now()
      }
    case SETSESSIONID :
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
