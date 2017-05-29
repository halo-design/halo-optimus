import { getUserConfigDataAction } from '../fetch/config'
import { postListAction } from '../fetch/post'
import { queryWhiteListAction } from '../fetch/whitelist'
import { queryResourceAction } from '../fetch/resource'

const SET_USER_TYPE_LEVEL = 'SET_USER_TYPE_LEVEL'
const POST_LIST = 'POST_LIST'
const GET_WHITE_LIST = 'GET_WHITE_LIST'
const GET_RESOURCE_LIST = 'GET_RESOURCE_LIST'

const setUserTypeLevel = (certType, level) => ({
  type: SET_USER_TYPE_LEVEL,
  data: {
    certType,
    level
  }
})

export const getUserConfigData = () => (dispatch, getState) => {
  dispatch(getUserConfigDataAction('')).then(action => {
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
  })
}

// 查询所有岗位
export const postList = data => (dispatch, getState) => {
  dispatch(postListAction(data)).then(action => {
    dispatch({
      type: POST_LIST,
      data: action.data.body
    })
  })
}

// 查询白名单列表
export const queryWhiteList = () => (dispatch, getState) => {
  dispatch(queryWhiteListAction()).then(action => {
    const dataBody = action.data.body
    dispatch({
      type: GET_WHITE_LIST,
      data: dataBody.whiteList
    })
  })
}

// 查询资源列表
export const getResourceList = state => (dispatch, getState) => {
  dispatch(queryResourceAction(state)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_RESOURCE_LIST,
        data: dataBody.resourceList
      })
    }
  })
}

const initialState = {
  certType: [],
  level: [],
  post: [],
  whiteList: [],
  resourceList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case POST_LIST:
      return {
        ...state,
        post: action.data
      }

    case SET_USER_TYPE_LEVEL:
      return {
        ...state,
        ...action.data
      }

    case GET_WHITE_LIST:
      return {
        ...state,
        whiteList: action.data
      }

    case GET_RESOURCE_LIST:
      return {
        ...state,
        resourceList: action.data
      }

    default:
      return state
  }
}
