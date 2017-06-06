import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError } from 'UTIL/info'
import { getCheckListAction, checkDecideAction } from '../fetch/check'

export const getCheckList = selectOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getCheckListAction(selectOpt)).then(action => {
    const dataBody = action.data.body
    dispatch(setCheckList(dataBody.pendList, dataBody.turnPageTotalNum, selectOpt))
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
      NotiSuccess({ description: '操作成功！' })
      if (success) success()
    } else {
      NotiError({ description: '操作失败！' })
      if (fail) fail()
    }
  })
}

const actionsReducer = createReducer({
  setCheckList: (checkList, checkListTotalNum, checkListSelectOpt) => ({ checkList, checkListTotalNum, checkListSelectOpt })
}, {
  checkList: [],
  checkListTotalNum: 0,
  checkListSelectOpt: {}
})

export const { setCheckList } = actionsReducer.actions
export default actionsReducer.reducer
