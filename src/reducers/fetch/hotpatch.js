import { getFetch } from 'CONSTANT/api'

export const queryHotpatchAction = () => getFetch('GET_HOTPATCH_LIST')

export const addHotpatchAction = data => getFetch('ADD_HOTPATCH_LIST', {
  body: data
})

export const queryHotpatchTaskAction = data => getFetch('GET_QUERY_HOTPATCH_LIST', {
  body: data
})

export const queryWhiteListAction = data => getFetch('GET_WHITELIST')

export const addHotpatchTaskAction = data => getFetch('ADD_HOTPATCH_TASK', {
  body: data
})

export const pauseHotpatchTaskAction = data => getFetch('SET_PAUSE_HOTPATCH_TASK', {
  body: data
})

