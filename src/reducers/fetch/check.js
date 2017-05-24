import { getFetch } from 'CONSTANT/api'

export const getCheckListAction = data => getFetch('GET_CHECK_LIST_URL', {
  body: data
})

export const getStateListAction = data => getFetch('GET_STATE_LIST_URL', {
  body: data
})

export const getHistoryListAction = data => getFetch('GET_CHECK_HISTORY_LIST_URL', {
  body: data
})

export const checkDecideAction = data => getFetch('OPERATE_CHECK_URL', {
  body: data
})

