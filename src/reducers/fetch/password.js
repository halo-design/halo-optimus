import API from 'CONSTANT/api'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'

export const changePasswordAction = (data) => ({
  [BZ_REQUESTER]: {
    types: 'APP_PSWD',
    url: API.CHANGE_PASSWORD_URL,
    body: data
  }
})
