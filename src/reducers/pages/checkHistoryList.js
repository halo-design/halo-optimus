import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { getHistoryListAction } from '../fetch/check'

export const getHistoryList = selectOpt => async (dispatch, getState) => {
  NProgress.start()
  const action = await dispatch(getHistoryListAction(selectOpt))
  const dataBody = action.data.body
  dispatch(setHistoryList(dataBody.hisList, dataBody.turnPageTotalNum, selectOpt))
}

const actionsReducer = createReducer({
  setHistoryList: (historyList, historyListTotalNum, historyListSelectOpt) => ({ historyList, historyListTotalNum, historyListSelectOpt })
}, {
  historyList: [],
  historyListTotalNum: 0,
  historyListSelectOpt: {}
})

export const { setHistoryList } = actionsReducer.actions
export default actionsReducer.reducer
