import createReducer from 'STORE/createReducer'
import { NotiSuccess, NotiError } from 'UTIL/info'
import { getStrategyList } from '../public/strategy'
import { addStrategyAction, editStrategyAction, deleteStrategyAction } from '../fetch/strategy'

// 刷新策略列表
const refreshStrategy = (dispatch, getState) => dispatch(getStrategyList({
  currentPage: 1,
  turnPageShowNum: getState().pages.strategy.strategyListSelOpt.turnPageShowNum
}))

// 新增策略
export const addStrategy = (data, success, fail) => (dispatch, getState) => {
  dispatch(addStrategyAction(data)).then(action => {
    if (action.data.body.errorCode === '0') {
      NotiSuccess({
        message: '成功',
        description: '策略新增成功！'
      })
      refreshStrategy(dispatch, getState)
      if (success) success()
    } else {
      NotiError({ description: '策略新增失败！' })
      if (fail) fail()
    }
  })
}

// 修改策略
export const editStrategy = (data, success, fail) => (dispatch, getState) => {
  dispatch(editStrategyAction(data)).then(action => {
    if (action.data.body.errorCode === '0') {
      NotiSuccess({ description: '策略修改成功！' })
      refreshStrategy(dispatch, getState)
      if (success) success()
    } else {
      NotiError({ description: '策略修改失败！' })
      if (fail) fail()
    }
  })
}

// 删除策略
export const deleteStrategy = data => (dispatch, getState) => {
  dispatch(deleteStrategyAction(data)).then(action => {
    if (action.data.body.errorCode === '0') {
      NotiSuccess({ description: '策略删除成功！' })
      refreshStrategy(dispatch, getState)
    } else {
      NotiError({ description: '策略删除失败！' })
    }
  })
}

const actionsReducer = createReducer({
  setAddEditModalVisible: addEditBoxVisible => ({ addEditBoxVisible })
}, {
  addEditBoxVisible: false
})

export const { setAddEditModalVisible } = actionsReducer.actions
export default actionsReducer.reducer
