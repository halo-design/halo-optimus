import { MsgSuccess, MsgError } from 'UTIL/info'
import { changePasswordAction } from '../fetch/password'

export const changePassword = (data, cb) => (dispatch, getState) => {
  dispatch(changePasswordAction(data)).then(action => {
    action.data.body.opResult == '1' ? 
    MsgSuccess('密码修改成功！') : 
    MsgError('密码修改失败，请重试！')
    if (cb) cb()
  })
}

