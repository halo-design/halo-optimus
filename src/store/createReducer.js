import { createActions, handleActions } from 'redux-actions'

export default (actions, initialState) => {
  const changeKyes = item => item.replace(/([A-Z])/g, '_$1').toUpperCase()
  const merge = (state, action) => ({
    ...state,
    ...action.payload
  })

  let handles = {}
  let newActions = {}

  Object.keys(actions).forEach(item => {
    const key = changeKyes(item)
    const action = actions[item]
    if (typeof action === 'function') {
      newActions[key] = action
      handles[key] = merge
    } else if (Object.prototype.toString.call(action) === '[object Object]') {
      newActions[key] = action.action
      handles[key] = action.merge
    }
  })

  return {
    actions: createActions(newActions),
    reducer: handleActions(handles, initialState)
  }
}
