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

export const platformFilter = record => record === '1' ? 'Android' : 'IOS'

export const releaseStatusFilter = record => record === '1' ? '发布中' : record === '2' ? '已结束' : '暂停'

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

export const ruleElementFilter = record => {
  switch (record) {
    case 'version':
      return '版本号'

    case 'city':
      return '城市'

    case 'mobileModel':
      return '机型'

    case 'netType':
      return 'netType'

    case 'osVersion':
      return 'OS版本'

    default:
      return record
  }
}
