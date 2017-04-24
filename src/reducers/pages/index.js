import { combineReducers } from 'redux'
import branchManage from './branchManage'
import userManage from './userManage'
import counter from './counter'

const pagesReducer = combineReducers({
  counter,
  branchManage,
  userManage
})

export default pagesReducer
