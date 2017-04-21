import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from 'REDUCER'
import requester from 'MIDDLEWARE/requester'

export default (initialState = {}) => {
  const enhancers = []
  let middleware = [thunk, requester]
  if (process.env.NODE_ENV === 'development') {
    middleware = [thunk, requester, logger]
  }
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
}
