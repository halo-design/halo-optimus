import { combineReducers } from 'redux'
import branchManage from './branchManage'
import userManage from './userManage'
import roleManage from './roleManage'
import postManage from './postManage'
import reviewSettings from './reviewSettings'
import strategySettings from './strategySettings'
import counter from './counter'

const pagesReducer = combineReducers({
  counter,
  branchManage,
  userManage,
  roleManage,
  postManage,
  reviewSettings,
  strategySettings
})

export default pagesReducer
