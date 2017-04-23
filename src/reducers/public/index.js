import { combineReducers } from 'redux'
import bindRole from './bindRole'
import branchTree from './branchTree'
import config from './config'
import login from './login'
import main from './main'
import menu from './menu'
import strategy from './strategy'

const publicReducer = combineReducers({
  bindRole,
  branchTree,
  config,
  login,
  main,
  menu,
  strategy
})

export default publicReducer
