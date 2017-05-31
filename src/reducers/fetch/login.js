import { getFetch } from 'CONSTANT/api'

export const setSessionIDAction = () => getFetch('GET_SESSION', {
  body: ''
})

export const loginAction = data => getFetch('SET_LOGIN', {
  body: data
})

export const logoutAction = () => getFetch('SET_LOGOUT')
