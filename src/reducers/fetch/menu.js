import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

export const getMenuAction = () => ({
  [BZ_REQUESTER]: {
    types: 'AUTH_MENU',
    url: API.AUTHRESOURCE_URL
  }
})
