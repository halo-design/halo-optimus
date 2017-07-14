import { getFetch } from 'CONSTANT/api'

export const getCheckListAction = data => getFetch('GET_CHECK_LIST', {
  body: data
})

export const getStateListAction = data => getFetch('GET_CHECK_STATE_LIST', {
  body: data
})

export const getHistoryListAction = data => getFetch('GET_CHECK_HISTORY_LIST', {
  body: data
})

export const checkDecideAction = data => getFetch('SET_CHECK_OPERATE', {
  body: data
})
