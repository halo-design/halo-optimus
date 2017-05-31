import { getFetch } from 'CONSTANT/api'

export const changePasswordAction = data => getFetch('SET_PASSWORD', {
  body: data
})
