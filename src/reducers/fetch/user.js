import { getFetch } from 'CONSTANT/api'
import md5 from 'md5'

const strFormat = (str, dft) => str || (dft || '')

export const userPageByBrhAction = (data, showNum) => getFetch('USER_PAGE_BY_BRH_URL', {
  body: {
    ...data,
    currentPage: strFormat(data.currentPage, 1),
    turnPageShowNum: strFormat(showNum)
  }
})

export const addUserAction = data => getFetch('USER_ADD_URL', {
  body: {
    ...data,
    userPwd: md5(data.userPwd)
  }
})

export const updateUserAction = data => getFetch('USER_UPDATE_URL', {
  body: {
    ...data,
    userPwd: data.pswdChange ? md5(data.userPwd) : data.userPwd,
    brhId: data.brhId ? data.brhId : ''
  }
})

export const delUserAction = userNo => getFetch('USER_DEL_URL', {
  body: {
    userNo: userNo
  }
})
