import { getFetch } from 'CONSTANT/api'

export const setSessionIDAction = () => getFetch('SESSION_URL', {
  body: ''
})

export const loginAction = data => getFetch('LOGIN_URL', {
  body: data
})

export const logoutAction = () => getFetch('LOGOUT_URL')
