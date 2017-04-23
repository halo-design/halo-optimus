import { combineReducers } from 'redux'
import branchManage from './branchManage'
import counter from './counter'

const pagesReducer = combineReducers({
  counter,
  branchManage
})

export default pagesReducer
