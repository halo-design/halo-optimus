import { getFetch } from 'CONSTANT/api'

export const getBsnListAction = data => getFetch('GET_BSN_LIST_URL', {
  body: data
})

export const getStrategyAction = authId => getFetch('GET_STRATEGY_URL', {
  body: {
    authId
  }
})

export const getStrategyListAction = data => getFetch('GET_STRATEGY_LIST_URL', {
  body: data
})

export const setRelationAction = data => getFetch('SET_CONNECTION_URL', {
  body: data
})

export const addStrategyAction = data => getFetch('ADD_STRATEGY_URL', {
  body: data
})

export const editStrategyAction = data => getFetch('EDIT_STRATEGY_URL', {
  body: data
})

export const deleteStrategyAction = data => getFetch('DELETE_STRATEGY_URL', {
  body: data
})
