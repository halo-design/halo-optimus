import { MsgSuccess, MsgError } from 'UTIL/info'
import { changePasswordAction } from '../fetch/password'

export const changePassword = (data, cb) => async (dispatch, getState) => {
  const action = await dispatch(changePasswordAction(data))
  if (action.data.body.opResult === '1') {
    MsgSuccess('密码修改成功！')
  } else {
    MsgError('密码修改失败，请重试！')
  }
  if (cb) cb()
}

