import { Modal, notification, message } from 'antd'

export const ModalError = data => Modal.error(data)
export const NotiSuccess = data => notification.success({
  message: '成功',
  ...data
})
export const NotiError = data => notification.error({
  message: '失败',
  ...data
})
export const MsgError = data => message.error(data)
export const MsgWarning = data => message.warning(data)
export const MsgSuccess = data => message.success(data)
