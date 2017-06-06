import createReducer from 'STORE/createReducer'
import { getUserConfigData, postList } from './config'

// 查询用户等级 + 证件类型配置信息 + 角色树 + 岗位列表
export const initUserForm = () => (dispatch, getState) => {
  dispatch(getUserConfigData())
  dispatch(postList())
}

const actionsReducer = createReducer({
  setPasswordVisible: passwordVisible => ({ passwordVisible }),
  refreshInfo: data => ({
    isUserMenuLoaded: true,
    currentCstIP: data.cstCurrLoginIP,
    currentLoginTime: data.cstCurrLoginTime,
    lastCstIP: data.cstLastLoginIP,
    lastLoginTime: data.cstLastLoginTime,
    loginCount: data.cstLoginTimes
  })
}, {
  currentCstIP: '',
  currentLoginTime: '',
  lastCstIP: '',
  lastLoginTime: '',
  loginCount: '',
  currentPath: '',
  passwordVisible: false
})

export const { setPasswordVisible, refreshInfo } = actionsReducer.actions
export default actionsReducer.reducer