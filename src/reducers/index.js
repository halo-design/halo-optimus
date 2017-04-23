import { combineReducers } from 'redux'
import publicReducer from './public'
import pagesReducer from './pages'

const rootReducer = combineReducers({
  public: publicReducer,
  pages: pagesReducer
})

export default rootReducer
