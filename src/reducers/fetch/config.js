import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

export const getUserConfigDataAction = data => ({
  [BZ_REQUESTER]: {
    types: 'CONFIG_DATA',
    url: API.GET_CONFIG_DATA_URL,
    body: {
      paramType: data
    }
  }
})
