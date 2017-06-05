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
    handles[key] = merge
    newActions[key] = actions[item]
  })

  return {
    actions: createActions(newActions),
    reducer: handleActions(handles, initialState)
  }
}
