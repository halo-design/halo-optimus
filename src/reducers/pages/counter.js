export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const LOG_TIME = 'LOG_TIME'

export const increment = () => ({
  type: COUNTER_INCREMENT
})

export const logtime = () => ({
  type: LOG_TIME
})

const initialState = {
  count: 0,
  time: 0
}
export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case LOG_TIME:
      return {
        ...state,
        time: (state.time + state.count + 1) * 2
      }
    default:
      return state
  }
}
