import { getFetch } from 'CONSTANT/api'

export const queryHotpatchAction = () => getFetch('GET_HOTPATCHLIST_URL')

export const addHotpatchAction = data => getFetch('ADD_HOTPATCHLIST_URL', {
  body: data
})

export const queryHotpatchTaskAction = data => getFetch('QUERY_HOTPATCHLIST_URL', {
  body: data
})

export const queryWhiteListAction = data => getFetch('GET_WHITELIST_URL')

export const addHotpatchTaskAction = data => getFetch('ADD_HOTPATCHTASK_URL', {
  body: data
})

export const pauseHotpatchTaskAction = data => getFetch('PAUSE_HOTPATCHTASK_URL', {
  body: data
})

