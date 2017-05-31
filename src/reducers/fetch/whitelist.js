import { getFetch } from 'CONSTANT/api'

export const queryWhiteListAction = () => getFetch('GET_WHITELIST')

export const addWhiteListAction = data => getFetch('ADD_WHITELIST', {
  body: data
})

export const delWhiteListAction = data => getFetch('DEL_WHITELIST', {
  body: data
})

export const whiteListAddAction = data => getFetch('ADD_WHITELIST_INFO', {
  body: data
})
