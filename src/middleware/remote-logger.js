import moment from 'moment'

if ('io' in window) {
  const socket = window.io.connect()
  console.remote = function () {
    let arg = [].slice.apply(arguments)
    let type = arg[0]
    arg.splice(1).forEach(item => {
      socket.emit(type, item)
    })
  }
}

const remoteLogger = ({ dispatch, getState }) => next => action => {
  if ('remote' in console) {
    console.remote('log:warn', `[ACTION][${moment().format('hh:mm:ss')}]: ${action.type}\n`)
    if ('data' in action) {
      const data = JSON.stringify(action.data)
      console.remote('log:success', `[DATA][${moment().format('hh:mm:ss')}]: ${data}\n`)
    }
  }
  return next(action)
}

export default remoteLogger
