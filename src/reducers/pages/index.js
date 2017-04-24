import { combineReducers } from 'redux'
import branchManage from './branchManage'
import userManage from './userManage'
import roleManage from './roleManage'
import counter from './counter'

const pagesReducer = combineReducers({
  counter,
  branchManage,
  userManage,
  roleManage
})

export default pagesReducer
