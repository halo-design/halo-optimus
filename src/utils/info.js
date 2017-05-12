import { Modal, notification, message } from 'antd'

export const ModalError = data => Modal.error(data)
export const NotiSuccess = data => notification.success(data)
export const NotiWarning = data => notification.warning(data)
export const MsgError = data => message.error(data)
export const MsgWarning = data => message.warning(data)
export const MsgSuccess = data => message.success(data)
