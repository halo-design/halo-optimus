import React from 'react'

const listHasItem = (list, key, val) => {
  let hasIt = false
  list.map(item => {
    item[key] === val ? hasIt = true : null
  })
  return hasIt
}

export const checkBtnList = (menu, btnList, noDivider) => {
  const ableBtn = []
  const divider = <span className='ant-divider' />
  const size = btnList.length
  btnList.map((item, i) => {
    const btn = checkBtn(menu, item.item, item.button)
    if (btn) {
      ableBtn.push(btn)
      !noDivider && i !== size - 1 ? ableBtn.push(divider) : null
    }
  })
  return ableBtn.length === 0 ? <span>无操作权限</span> : ableBtn.map((item, i) => (<span key={i}>{item}</span>))
}

export const checkBtn = (menu, item, button) => {
  let menuItem = item
  item.length > 4 ? null : menuItem = menu.currentMenu + item
  return listHasItem(menu.menuItemList, 'menuItemId', menuItem) ? button : null
}

export const groupList = (list, id, parentId, childName, conver) => {
  let groupList = []
  let keyMap = {}

  list.map(item => {
    keyMap[item[id]] = conver ? conver(item) : item
  })

  list.map(item => {
    if (!item[parentId] || !keyMap[item[parentId]]) {
      groupList.push(keyMap[item[id]])
    } else if (keyMap[item[parentId]]) {
      keyMap[item[parentId]][childName] ? null : keyMap[item[parentId]][childName] = []
      keyMap[item[parentId]][childName].push(keyMap[item[id]])
    }
  })

  return groupList
}

export const getNodeFromList = (id, list, idName, childName, conver) => {
  let node = null
  for (var el of list) {
    let chName = el[childName]
    if (el[idName] === id) {
      node = conver ? conver(el) : el
    } else if (chName && chName.length > 0) {
      node = getNodeFromList(id, chName, idName, childName, conver)
      node ? node = (conver ? conver(node) : node) : null
    }
  }
  return node
}

export const isEmptyObject = obj => {
  let name
  for (name in obj) {
    return false
  }
  return true
}

export const formatDateTime = text => {
  return `${text.substring(0, 4)}/${text.substring(4, 6)}/${text.substring(6, 8)} ${text.substring(8, 10)}:${text.substring(10, 12)}`
}

export const str2json = str => {
  let paramsArr = str.split(',')
  let jsonArr = []
  paramsArr.map(item => {
    let tmp = {}
    let li = item.split('=')
    let key = li[0]
    let val = li[1]
    key ? null : key = '未知'
    if (val) {
      tmp.key = key
      val.indexOf(':') > 0 ? val = val.replace(/:/g, '， ') : null
      tmp.value = val
      jsonArr.push(tmp)
    } else {
      jsonArr.push({
        key: key,
        value: '暂无'
      })
    }
  })
  return jsonArr
}

export const releaseFilter = record => {
  switch (record) {
    case '1':
      return '白名单灰度'

    case '2':
      return '时间窗灰度'

    default:
      return '正式发布'
  }
}

export const enterpriseFilter = record => record === '0' ? '企业包' : '正式包'

export const upgradeTypeFilter = record => record === '1' ? '单次提醒' : '多次提醒'

export const releaseStatusFilter = record => record === '1' ? '发布中' : record === '2' ? '已结束' : '暂停'

export const platformFilter = record => {
  switch (record) {
    case '0':
      return '平台无关'

    case '1':
      return 'Android'

    case '2':
      return 'IOS'

    default:
      return record
  }
}

export const operationFilter = record => {
  switch (record) {
    case '1':
      return '包含'

    case '2':
      return '不包含'

    case '3':
      return '范围内'

    case '4':
      return '范围外'

    default:
      return record
  }
}

export const resourceFilter = record => {
  switch (record) {
    case 'version':
      return '版本号'

    case 'city':
      return '城市'

    case 'mobileModel':
      return '机型'

    case 'netType':
      return '网络'

    case 'osVersion':
      return 'OS版本'

    default:
      return record
  }
}

export const whitelistIdsFilter = data => data.map(item => item.whiteListName)

export const formatGreyConfigInfo = data => {
  const rules = JSON.parse(data).subRules
  return rules.map(item => ({
    ruleElement: item.right,
    operation: item.operator,
    value: Array.isArray(item.left) ? item.left.join(', ') : isEmptyObject(item.left) ? '暂无' : `${item.left.upper} - ${item.left.lower}`
  }))
}

export const whiteListFilter = record => {
  switch (record) {
    case 'userid':
      return '用户白名单'

    default:
      return record
  }
}

export const businessFilter = record => {
  switch (record) {
    case 'hotpatch':
      return '热修复'

    case 'upgrade':
      return '升级'

    default:
      return record
  }
}

