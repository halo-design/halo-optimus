import createReducer from 'STORE/createReducer'
import { getUserConfigDataAction } from '../fetch/config'
import { postListAction } from '../fetch/post'
import { queryWhiteListAction } from '../fetch/whitelist'
import { queryResourceAction } from '../fetch/resource'

export const getUserConfigData = () => async (dispatch, getState) => {
  const action = await dispatch(getUserConfigDataAction(''))
  let paramList = action.data.body.paramList
  let levelList = []
  let certTypeList = []
  if (paramList) {
    paramList.map(item => {
      if (item.paramType === 'level') {
        levelList.push(item)
      } else if (item.paramType === 'certType') {
        certTypeList.push(item)
      }
    })
    dispatch(setUserTypeLevel(certTypeList, levelList))
  }
}

// 查询所有岗位
export const postList = data => async (dispatch, getState) => {
  const action = await dispatch(postListAction(data))
  dispatch(setPostList(action.data.body))
}

// 查询白名单列表
export const queryWhiteList = () => async (dispatch, getState) => {
  const action = await dispatch(queryWhiteListAction())
  const dataBody = action.data.body
  dispatch(setWhiteList(dataBody.whiteList))
}

// 查询资源列表
export const getResourceList = state => async (dispatch, getState) => {
  const action = await dispatch(queryResourceAction(state))
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    dispatch(setResourceList(dataBody.resourceList))
  }
}

const actionsReducer = createReducer({
  setUserTypeLevel: (certType, level) => ({ certType, level }),
  setPostList: post => ({ post }),
  setWhiteList: whiteList => ({ whiteList }),
  setResourceList: resourceList => ({ resourceList })
}, {
  certType: [],
  level: [],
  post: [],
  whiteList: [],
  resourceList: []
})

export const { setUserTypeLevel, setPostList, setWhiteList, setResourceList } = actionsReducer.actions
export default actionsReducer.reducer