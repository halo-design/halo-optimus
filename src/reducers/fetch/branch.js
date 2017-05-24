import { getFetch } from 'CONSTANT/api'

export const getBranchListAction = () => getFetch('GET_BRANCH_LIST_URL', {
  body: {
    queryType: '1'
  }
})

// 查询操作
export const getBranchAction = data => getFetch('GET_BRANCH_URL_BYID', {
  body: data
})

// 修改操作
export const modifyBranchAction = data => getFetch('GET_BRANCH_MODIFY', {
  body: data,
  header: {
    type: 'K'
  }
})

// 删除操作
export const deleteBranchAction = data => getFetch('GET_BRANCH_DELETE', {
  body: {
    brhId: data.brhId
  },
  header: {
    type: 'K'
  }
})

// 增加操作
export const addBranchAction = data => getFetch('GET_BRANCH_ADD', {
  body: data
})

