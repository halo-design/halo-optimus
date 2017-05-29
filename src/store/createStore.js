import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from 'REDUCER'
import requester from 'MIDDLEWARE/requester'
import remoteLogger from 'MIDDLEWARE/remote-logger'

export default (initialState = {}) => {
  const enhancers = [autoRehydrate()]
  let middleware = [thunk, requester]
  if (process.env.NODE_ENV === 'development') {
    middleware = [thunk, requester, logger, remoteLogger]
  }
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  persistStore(store)
  return store
}
