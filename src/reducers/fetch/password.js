import { getFetch } from 'CONSTANT/api'

export const changePasswordAction = data => getFetch('CHANGE_PASSWORD_URL', {
  body: data
})
