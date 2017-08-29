import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError, MsgError } from 'UTIL/info'
import { getBsnListAction, getStrategyAction, setRelationAction } from '../fetch/strategy'

export const getBsnList = selectOpt => async (dispatch, getState) => {
  NProgress.start()
  const action = await dispatch(getBsnListAction(selectOpt))
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    dispatch(setBsnList(dataBody.bsnList, dataBody.turnPageTotalNum, selectOpt))
  } else {
    MsgError('获取列表失败！')
  }
  NProgress.done()
}

export const getStrategy = (authId, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(getStrategyAction(authId))
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    const authDefine = dataBody.authDefine
    const authDefArr = authDefine.split('')
    dispatch(setStrategy({
      alias: dataBody.alias,
      authId: dataBody.authId,
      authType: dataBody.authType,
      areaNo: dataBody.areaNo,
      authDefine: authDefine,
      add1: authDefArr[0],
      add2: authDefArr[1],
      add3: authDefArr[2],
      add4: authDefArr[3],
      add5: authDefArr[4]
    }))
    if (success) success()
  } else {
    MsgError('数据获取失败！')
    if (fail) fail()
  }
}

export const setRelation = params => async (dispatch, getState) => {
  const action = await dispatch(setRelationAction(params))
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    dispatch(getBsnList(getState().pages.reviewSettings.bsnSelectOpt))
    NotiSuccess({ description: '关联成功！' })
  } else {
    NotiError({ description: '关联失败！' })
  }
}

const actionsReducer = createReducer({
  setBsnList: (bsnList, bsnListTotalNum, bsnSelectOpt) => ({ bsnList, bsnListTotalNum, bsnSelectOpt }),
  setStrategy: strategyDetail => ({ strategyDetail })
}, {
  bsnList: [],
  bsnListTotalNum: 0,
  bsnSelectOpt: {},
  strategyDetail: {}
})

export const { setBsnList, setStrategy } = actionsReducer.actions
export default actionsReducer.reducer
