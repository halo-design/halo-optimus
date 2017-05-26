import { getFetch } from 'CONSTANT/api'

export const queryResourceAction = data => getFetch('GET_RESOURCE_URL', {
  body: data
})

export const addResourceAction = data => getFetch('ADD_RESOURCE_URL', {
  body: data
})

export const delResourceAction = data => getFetch('DEL_RESOURCE_URL', {
  body: data
})

export const changeResourceAction = data => getFetch('CHANGE_RESOURCE_URL', {
  body: data
})

