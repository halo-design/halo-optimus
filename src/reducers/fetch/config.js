import { getFetch } from 'CONSTANT/api'

export const getUserConfigDataAction = data => getFetch('GET_CONFIG_DATA', {
  body: {
    paramType: data
  }
})
