import { getFetch } from 'CONSTANT/api'

export const getBranchListAction = () => getFetch('GET_BRANCH_LIST', {
  body: {
    queryType: '1'
  }
})

// 查询操作
export const getBranchAction = data => getFetch('GET_BRANCH_BY_ID', {
  body: data
})

// 修改操作
export const modifyBranchAction = data => getFetch('SET_BRANCH', {
  body: data
})

// 删除操作
export const deleteBranchAction = data => getFetch('DEL_BRANCH', {
  body: {
    brhId: data.brhId
  }
})

// 增加操作
export const addBranchAction = data => getFetch('ADD_BRANCH', {
  body: data
})
