import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError } from 'UTIL/info'
import * as RQ from '../fetch/resource'

export const queryResourceList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryResourceAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch(setResourceListData(dataBody.resourceList))
    }
    NProgress.done()
  })
}

export const addResourceList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addResourceAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryResourceList())
      NotiSuccess({ description: '添加成功！' })
      success && success()
    } else {
      NotiError({ description: '添加失败！' })
      fail && fail()
    }
  })
}

export const changeResourceList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.changeResourceAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryResourceList())
      NotiSuccess({ description: '修改成功！' })
      success && success()
    } else {
      NotiError({ description: '修改失败！' })
      fail && fail()
    }
  })
}

export const delResource = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.delResourceAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryResourceList())
      NotiSuccess({ description: '删除成功！' })
      success && success()
    } else {
      NotiError({ description: '删除失败！' })
      fail && fail()
    }
  })
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
