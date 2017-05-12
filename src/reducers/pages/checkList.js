import NProgress from 'nprogress'
import { NotiSuccess, NotiWarning } from 'UTIL/info'
import { getCheckListAction, checkDecideAction } from '../fetch/check'

const GET_CHECK_LIST = 'GET_CHECK_LIST'

export const getCheckList = selectOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getCheckListAction(selectOpt)).then(action => {
    const dataBody = action.data.body
    dispatch({
      type: GET_CHECK_LIST,
      data: {
        checkList: dataBody.pendList,
        checkListTotalNum: dataBody.turnPageTotalNum,
        checkListSelectOpt: selectOpt
      }
    })
    NProgress.done()
  })
}

export const checkDecide = (data, success, fail) => (dispatch, getState) => {
  dispatch(checkDecideAction(data)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch(getCheckList({
        currentPage: 1,
        turnPageShowNum: getState().pages.checkList.checkListSelectOpt.turnPageShowNum
      }))
      NotiSuccess({
        message: '成功',
        description: '操作成功！'
      })
      if (success) success()
    } else {
      NotiWarning({
        message: '失败',
        description: '操作失败！'
      })
      if (fail) fail()
    }
  })
}

const initialState = {
  checkList: [],
  checkListTotalNum: 0,
  checkListSelectOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_CHECK_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
