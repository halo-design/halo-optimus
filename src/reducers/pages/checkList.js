import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError } from 'UTIL/info'
import { getCheckListAction, checkDecideAction } from '../fetch/check'

export const getCheckList = selectOpt => async (dispatch, getState) => {
  NProgress.start()
  const action = await dispatch(getCheckListAction(selectOpt))
  const dataBody = action.data.body
  dispatch(setCheckList(dataBody.pendList, dataBody.turnPageTotalNum, selectOpt))
  NProgress.done()
}

export const checkDecide = (data, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(checkDecideAction(data))
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
