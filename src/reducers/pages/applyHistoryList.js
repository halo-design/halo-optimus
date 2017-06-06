import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { getStateListAction } from '../fetch/check'

export const getStateList = selectOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getStateListAction(selectOpt)).then(action => {
    const dataBody = action.data.body
    dispatch(setStateList(dataBody.stateList, dataBody.turnPageTotalNum, selectOpt))
    NProgress.done()
  })
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
