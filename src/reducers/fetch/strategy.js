import { getFetch } from 'CONSTANT/api'

export const getBsnListAction = data => getFetch('GET_BSN_LIST', {
  body: data
})

export const getStrategyAction = authId => getFetch('GET_STRATEGY', {
  body: {
    authId
  }
})

export const getStrategyListAction = data => getFetch('GET_STRATEGY_LIST', {
  body: data
})

export const setRelationAction = data => getFetch('SET_CONNECTION', {
  body: data
})

export const addStrategyAction = data => getFetch('ADD_STRATEGY', {
  body: data
})

export const editStrategyAction = data => getFetch('SET_STRATEGY', {
  body: data
})

export const deleteStrategyAction = data => getFetch('DEL_STRATEGY', {
  body: data
})
