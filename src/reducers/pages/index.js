import { combineReducers } from 'redux'
import branchManage from './branchManage'
import userManage from './userManage'
import roleManage from './roleManage'
import postManage from './postManage'
import reviewSettings from './reviewSettings'
import strategySettings from './strategySettings'
import checkList from './checkList'
import checkHistoryList from './checkHistoryList'
import applyHistoryList from './applyHistoryList'
import updateManage from './updateManage'
import hotpatchManage from './hotpatchManage'
import whiteListManage from './whiteListManage'
import resourceManage from './resourceManage'

const pagesReducer = combineReducers({
  branchManage,
  userManage,
  roleManage,
  postManage,
  reviewSettings,
  strategySettings,
  checkList,
  checkHistoryList,
  applyHistoryList,
  updateManage,
  hotpatchManage,
  whiteListManage,
  resourceManage
})

export default pagesReducer
