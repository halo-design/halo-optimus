import { combineReducers } from 'redux'
import counter from './counter'

const pagesReducer = combineReducers({
  counter
})

export default pagesReducer
