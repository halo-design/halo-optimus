const remoteLogger = ({ dispatch, getState }) => next => action => {
  if (console.hasOwnProperty('remote')) {
    console.remote(action.type)
  }
  // console.remote(getState())
  return next(action)
}

export default remoteLogger
