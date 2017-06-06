import createReducer from 'STORE/createReducer'
import { delCookies, setCookie } from 'UTIL/cookie'
import NProgress from 'nprogress'
import { MsgError } from 'UTIL/info'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { setSessionIDAction, loginAction, logoutAction } from '../fetch/login'

export const setSessionID = () => (dispatch, getState) => {
  delCookies(['cstName', 'iCIFID', 'eCIFID'])
  dispatch(setSessionIDAction()).then(action => {
    const { header, body } = action.data
    if (header.iCIFID) {
      setCookie('iCIFID', header.iCIFID)
      dispatch(doSetSesionId(header.iCIFID))
    } else {
      setCookie('iCIFID', body.iCIFID)
      dispatch(doSetSesionId(body.iCIFID))
    }
  })
}

export const logout = () => (dispatch, getState) => {
  dispatch(logoutAction())
  dispatch(doLogout())
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
      dispatch(doLogin(dataBody.cstName))
      if (success) {
        success()
      }
    } else {
      dataBody.errorMsg
      ? MsgError(dataBody.errorMsg)
      : MsgError('登录信息有误！')
      dispatch(loginFailed())
      dispatch(setSessionID())
      if (fail) {
        fail()
      }
    }
  })
}

const actionsReducer = createReducer({
  doLogin: cstname => ({ isLogin: 'true', cstname }),
  doLogout: () => ({ isLogin: 'false' }),
  doSetSesionId: iCIFID => ({
    iCIFID,
    checkCodeSrc: `${API.GET_CHECKCODE_URL}?nocache=${Date.now()}&iCIFID=${iCIFID}`
  }),
  loginFailed: () => ({ isLogin: 'FAILED', time: Date.now() })
}, {
  isLogin: 'false',
  iCIFID: '',
  time: '',
  cstname: '',
  checkCodeSrc: ''
})

export const { doLogin, doLogout, doSetSesionId, loginFailed } = actionsReducer.actions
export default actionsReducer.reducer