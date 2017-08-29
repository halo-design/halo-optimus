import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { initBranchList } from '../public/branchTree'
import { getBranchAction, modifyBranchAction, deleteBranchAction, addBranchAction } from '../fetch/branch'
import { NotiSuccess, NotiError, MsgWarning } from 'UTIL/info'

export const changeBranchSelected = data => async (dispatch, getState) => {
  if (data.brhId !== null || data.brhId !== undefined) {
    NProgress.start()
    const action = await dispatch(getBranchAction(data))
    const dataBody = action.data.body
    dispatch(applyBranch(dataBody))
    NProgress.done()
  } else {
    MsgWarning('当前未选中机构！')
    dispatch(resetForm())
  }
}

export const branchModify = (params, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(modifyBranchAction(params))
  if (action.data.body.errorCode === '0') {
    dispatch(initBranchList())
    NotiSuccess({ description: '修改成功！' })
    if (success) success()
  } else {
    NotiError({ description: '修改失败！' })
    if (fail) fail()
  }
}

// 删除机构
export const branchDelete = (params, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(deleteBranchAction(params))
  if (action.data.body.errorCode === '0' && action.data.body.op_result !== '0') {
    dispatch(initBranchList())
    dispatch(resetForm())
    NotiSuccess({ description: '删除成功！' })
    if (success) success()
  } else {
    NotiError({ description: '删除失败！' })
    if (fail) fail()
  }
}

export const branchAdd = (params, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(addBranchAction(params))
  if (action.data.body.errorCode === '0') {
    dispatch(initBranchList())
    // 添加完毕后选中该节点
    dispatch(changeBranchSelected(params))
    NotiSuccess({ description: '添加成功！' })
    if (success) success()
  } else {
    NotiError({ description: '添加失败！' })
    if (fail) fail()
  }
}

const actionsReducer = createReducer({
  resetForm: () => ({
    selectedObject: {},
    brhId: ''
  }),
  applyBranch: branchList => ({
    selectedObject: branchList,
    brhId: branchList.brhId
  }),
  setAddBranchVisible: addBranchBoxVisible => ({ addBranchBoxVisible })
}, {
  brhId: '',
  selectedObject: {},
  addBranchBoxVisible: false
})

export const { resetForm, applyBranch, setAddBranchVisible } = actionsReducer.actions
export default actionsReducer.reducer
