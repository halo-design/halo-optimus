import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { groupList } from 'UTIL/filters'
import { getBranchListAction } from '../fetch/branch'

const getBranch = branch => ({
  label: branch.brhName,
  value: branch.brhId,
  key: branch.brhId,
  children: []
})

const converRole = branch => ({
  id: branch.brhId,
  parentId: branch.brhParentId,
  name: branch.brhName,
  children: []
})

export const initBranchList = cb => (dispatch, getState) => {
  NProgress.start()
  dispatch(getBranchListAction()).then(action => {
    const allBranchList = action.data.body.branchList
    const treeBranchList = groupList(allBranchList, 'brhId', 'brhParentId', 'children', converRole)
    const selectTreeBranchList = groupList(allBranchList, 'brhId', 'brhParentId', 'children', getBranch)

    // 新增的时候查机构列表
    dispatch(setBranchList(selectTreeBranchList))
    dispatch(setUserGroupBranch({ allBranchList, treeBranchList }))
    NProgress.done()
    if (cb) cb()
  })
}

const actionsReducer = createReducer({
  setBranchList: selectTreeBranchList => ({ selectTreeBranchList }),
  setUserGroupBranch: data => data
}, {
  allBranchList: [],
  selectTreeBranchList: [],
  treeBranchList: []
})

export const { setBranchList, setUserGroupBranch } = actionsReducer.actions
export default actionsReducer.reducer
