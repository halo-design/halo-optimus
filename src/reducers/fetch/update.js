import { getFetch } from 'CONSTANT/api'

export const queryUpdateListAction = () => getFetch('GET_UPDATE_LIST')

export const addUpgradeListAction = data => getFetch('ADD_UPGRADE_LIST', {
  body: data
})

export const addUpgradeTaskAction = data => getFetch('ADD_UPGRADE_TASK', {
  body: data
})

export const getUpgradeTaskAction = data => getFetch('GET_UPGRADE_TASK', {
  body: data
})

export const getTaskDetailAction = data => getFetch('GET_UPGRADE_TASK_DETAIL', {
  body: data
})

export const changeTaskStatusAction = data => getFetch('SET_UPGRADE_TASK_STATUS', {
  body: data
})
