import moment from 'moment'

const remoteLogger = ({ dispatch, getState }) => next => action => {
  if (console.hasOwnProperty('remote')) {
    console.remote(`[ACTION][${moment().format('hh:mm:ss')}]: ${action.type}\n`)
    if ('data' in action) {
      let data = JSON.stringify(action.data)
      console.remote(`[ACTION][${moment().format('hh:mm:ss')}]: ${data}\n`)
    }
  }
  return next(action)
}

export default remoteLogger
