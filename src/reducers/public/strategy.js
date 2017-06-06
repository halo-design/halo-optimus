import createReducer from 'STORE/createReducer'
import { getStrategyListAction } from '../fetch/strategy'
import NProgress from 'nprogress'

export const getStrategyList = selOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getStrategyListAction(selOpt)).then(action => {
    const dataBody = action.data.body
    const authDefList = dataBody.authDefList
    let strategyList = []
    authDefList.map(item => {
      const def = item.authDefine.split('')
      strategyList.push({
        ...item,
        add1: def[0],
        add2: def[1],
        add3: def[2],
        add4: def[3],
        add5: def[4]
      })
    })
    dispatch(setStrategyList(strategyList, dataBody.turnPageTotalNum, selOpt))
    NProgress.done()
  })
}

const actionsReducer = createReducer({
  setStrategyList: (strategyList, strategyListTotalNum, strategyListSelOpt) => ({ strategyList, strategyListTotalNum, strategyListSelOpt })
}, {
  strategyList: [],
  strategyListTotalNum: 0,
  strategyListSelOpt: {}
})

export const { setStrategyList } = actionsReducer.actions
export default actionsReducer.reducer