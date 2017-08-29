import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError } from 'UTIL/info'
import * as RQ from '../fetch/resource'

export const queryResourceList = () => async (dispatch, getState) => {
  NProgress.start()
  const action = await dispatch(RQ.queryResourceAction())
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    dispatch(setResourceListData(dataBody.resourceList))
  }
  NProgress.done()
}

export const addResourceList = (state, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(RQ.addResourceAction(state))
  if (action.data.body.errorCode === '0') {
    dispatch(queryResourceList())
    NotiSuccess({ description: '添加成功！' })
    success && success()
  } else {
    NotiError({ description: '添加失败！' })
    fail && fail()
  }
}

export const changeResourceList = (state, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(RQ.changeResourceAction(state))
  if (action.data.body.errorCode === '0') {
    dispatch(queryResourceList())
    NotiSuccess({ description: '修改成功！' })
    success && success()
  } else {
    NotiError({ description: '修改失败！' })
    fail && fail()
  }
}

export const delResource = (state, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(RQ.delResourceAction(state))
  if (action.data.body.errorCode === '0') {
    dispatch(queryResourceList())
    NotiSuccess({ description: '删除成功！' })
    success && success()
  } else {
    NotiError({ description: '删除失败！' })
    fail && fail()
  }
}

const actionsReducer = createReducer({
  setResourceListData: resourceList => ({ resourceList }),
  setAddEditResouceState: addEditResourceState => ({ addEditResourceState })
}, {
  resourceList: [],
  addEditResourceState: {
    mode: 'add',
    visible: false,
    initData: null
  }
})

export const { setResourceListData, setAddEditResouceState } = actionsReducer.actions
export default actionsReducer.reducer
