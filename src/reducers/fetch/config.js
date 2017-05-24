import { getFetch } from 'CONSTANT/api'

export const getUserConfigDataAction = data => getFetch('GET_CONFIG_DATA_URL', {
  body: {
    paramType: data
  }
})
