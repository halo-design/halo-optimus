import { getUserConfigData, postList } from './config'

const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const USER_MENU_SUC = 'USER_MENU_SUC'

export const setPasswordVisible = state => ({
  type: CHANGE_PASSWORD,
  data: state
})

export const refreshInfo = body => ({
  type: USER_MENU_SUC,
  data: {
    isUserMenuLoaded: true,
    currentCstIP: body.cstCurrLoginIP,
    currentLoginTime: body.cstCurrLoginTime,
    lastCstIP: body.cstLastLoginIP,
    lastLoginTime: body.cstLastLoginTime,
    loginCount: body.cstLoginTimes
  }
})

// 查询用户等级 + 证件类型配置信息 + 角色树 + 岗位列表
export const initUserForm = () => (dispatch, getState) => {
  dispatch(getUserConfigData())
  dispatch(postList())
}

const initialState = {
  currentCstIP: '',
  currentLoginTime: '',
  lastCstIP: '',
  lastLoginTime: '',
  loginCount: '',
  currentPath: '',
  passwordVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_PASSWORD:
      return {
        ...state,
        passwordVisible: action.data
      }

    case USER_MENU_SUC:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
