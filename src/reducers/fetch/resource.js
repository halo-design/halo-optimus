import { getFetch } from 'CONSTANT/api'

export const queryResourceAction = data => getFetch('GET_RESOURCE', {
  body: data
})

export const addResourceAction = data => getFetch('ADD_RESOURCE', {
  body: data
})

export const delResourceAction = data => getFetch('DEL_RESOURCE', {
  body: data
})

export const changeResourceAction = data => getFetch('SET_RESOURCE', {
  body: data
})
