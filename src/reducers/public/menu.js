import createReducer from 'STORE/createReducer'
import { groupList, getNodeFromList } from 'UTIL/filters'
import NProgress from 'nprogress'
import { getMenuAction } from '../fetch/menu'
import { refreshInfo } from './main'

const converMenu = menu => ({
  id: menu.menuId,
  parentId: menu.menuParentId,
  logo: menu.menuLogo,
  url: menu.menuUrl,
  title: menu.menuName,
  level: menu.menuLevel,
  menus: [],
  branchList: []
})

const treeNodeToMenu = item => ({
  id: item.id,
  parentId: item.parentId,
  logo: item.logo,
  url: item.url,
  level: item.level,
  name: item.title
})

const addWithoutPNode = (id, sourceList, targetList) => {
  let sourceNode = getNodeFromList(id, sourceList, 'id', 'menus', treeNodeToMenu)
  let node = getNodeFromList(id, targetList, 'id', 'menus', treeNodeToMenu)

  if (sourceNode || !node) {
    return
  }

  sourceList.push(node)
  addWithoutPNode(node.parentId, sourceList, targetList)
}

export const initUserMenu = cb => async (dispatch, getState) => {
  let authMenu = []
  let userMenu = []
  let topMenu = []
  NProgress.start()
  const action = await dispatch(getMenuAction())
  const dataBody = action.data.body
  const sourceList = dataBody.menuList

  dispatch(saveUserMenu(sourceList, dataBody.menuItemList))

  authMenu = groupList(dataBody.menuList, 'id', 'parentId', 'menus', converMenu)
  authMenu.map(data => data.level === '0' ? topMenu.push(data) : null)

  let userMenuMap = {}
  sourceList.map(item => {
    userMenuMap[item.id] = item
  })
  sourceList.map(item => item.parentId && !userMenuMap[item.parentId] ? addWithoutPNode(item.parentId, sourceList, authMenu) : null)

  userMenu = groupList(sourceList, 'menuId', 'menuParentId', 'menus', converMenu)
  dispatch(mergeFinalMenu(userMenu))

  dispatch(refreshInfo(action.data.body))
  NProgress.done()
  if (cb) cb()
}

const actionsReducer = createReducer({
  saveUserMenu: (menuList, menuItemList) => ({ userMenu: { menuList, menuItemList } }),
  mergeFinalMenu: items => ({ items }),
  selectMenu: {
    action: currentMenu => currentMenu,
    merge: (state, action) => {
      const currentMenu = action.payload
      return {
        ...state,
        currentMenu,
        userMenu: {
          ...state.userMenu,
          currentMenu
        }
      }
    }
  }
}, {
  items: [],
  topMenu: [],
  userMenu: {},
  currentMenu: ''
})

export const { saveUserMenu, mergeFinalMenu, selectMenu } = actionsReducer.actions
export default actionsReducer.reducer