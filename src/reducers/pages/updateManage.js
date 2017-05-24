import NProgress from 'nprogress'
import * as RQ from '../fetch/update'

const GET_UPDATE_LIST = 'GET_UPDATE_LIST'

export const queryUpdateList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryUpdateListAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_UPDATE_LIST,
        data: dataBody.upgradeList
      })
    }
    NProgress.done()
  })
}

export const getUpgradeTask = (data, cb) => (dispatch, getState) => {
  dispatch(RQ.getUpgradeTaskAction(data)).then(action => {
    cb && cb(action.data.body)
  })
}

const initialState = {
  upgradeList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_UPDATE_LIST:
      return {
        ...state,
        upgradeList: action.data
      }

    default:
      return state
  }
}
