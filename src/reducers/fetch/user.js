import { getFetch } from 'CONSTANT/api'
import md5 from 'md5'

const strFormat = (str, dft) => str || (dft || '')

export const userPageByBrhAction = (data, showNum) => getFetch('GET_USER_BY_BRH', {
  body: {
    ...data,
    currentPage: strFormat(data.currentPage, 1),
    turnPageShowNum: strFormat(showNum)
  }
})

export const addUserAction = data => getFetch('ADD_USER', {
  body: {
    ...data,
    userPwd: md5(data.userPwd)
  }
})

export const updateUserAction = data => getFetch('SET_UPDATE_USER', {
  body: {
    ...data,
    userPwd: data.pswdChange ? md5(data.userPwd) : data.userPwd,
    brhId: data.brhId ? data.brhId : ''
  }
})

export const delUserAction = userNo => getFetch('DEL_USER', {
  body: {
    userNo: userNo
  }
})
