import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import publicReducer from './public'
import pagesReducer from './pages'

const rootReducer = combineReducers({
  routing: routerReducer,
  public: publicReducer,
  pages: pagesReducer
})

export default rootReducer
