import { getFetch } from 'CONSTANT/api'

export const queryUpdateListAction = () => getFetch('GET_UPDATELIST_URL')

export const addUpgradeListAction = data => getFetch('ADD_UPGRADELISHT_URL', {
  body: data
})

export const addUpgradeTaskAction = data => getFetch('ADD_UPGRADETASK_URL', {
  body: data
})

export const getUpgradeTaskAction = data => getFetch('GET_UPGRADETASK_URL', {
  body: data
})

export const getTaskDetailAction = data => getFetch('GET_TASK_DETAIL_URL', {
  body: data
})

export const changeTaskStatusAction = data => getFetch('CHANGE_TASK_STATUS_URL', {
  body: data
})
