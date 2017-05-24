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

export const releaseFilter = record => record === '0' ? '待发布' : record === '1' ? '灰度发布' : '正式发布'

export const enterpriseFilter = record => record === '0' ? '企业包' : '正式包'

export const upgradeTypeFilter = record => record === '1' ? '单次提醒' : '多次提醒'

export const platformFilter = record => record === '1' ? 'Android' : 'IOS'

export const releaseStatusFilter = record => record === '1' ? '发布中' : record === '2' ? '已结束' : '暂停'
