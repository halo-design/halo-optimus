import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { getStateListAction } from '../fetch/check'

export const getStateList = selectOpt => async (dispatch, getState) => {
  NProgress.start()
  const action = await dispatch(getStateListAction(selectOpt))
  const dataBody = action.data.body
  dispatch(setStateList(dataBody.stateList, dataBody.turnPageTotalNum, selectOpt))
  NProgress.done()
}

const actionsReducer = createReducer({
  setStateList: (stateList, stateListTotalNum, stateListSelectOpt) => ({
    stateList,
    stateListTotalNum,
    stateListSelectOpt
  })
}, {
  stateList: [],
  stateListTotalNum: 0,
  stateListSelectOpt: {}
})

export const { setStateList } = actionsReducer.actions
export default actionsReducer.reducer
