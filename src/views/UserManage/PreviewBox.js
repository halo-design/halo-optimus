import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button, Modal } from 'antd'
import { closePreviewUser } from 'REDUCER/pages/userManage'

@connect(
  state => {
    const {
      pages: {
        userManage: {
          previewBox: { visible, info }
        }
      },
      public: {
        config: { level, certType }
      }
    } = state
    return {
      visible,
      level,
      certType,
      info
    }
  },
  dispatch => bindActionCreators({ closePreviewUser }, dispatch)
)

export default class PreviewBox extends React.Component {

  onClose () {
    this.props.closePreviewUser()
  }

  render () {
    const { visible, level, certType, info } = this.props
    const { userLevel, userCertType, userName, userEmail, userMobile, postName, userRight, userLoginName, userDesc, userAddress, userCertNo, brhName, roleList } = info

    const getRoleName = roleList => {
      let roleName = ''
      if (!roleList) {
        return ''
      }
      roleList.map((item, i) => {
        i === 0 ? roleName += item.roleName : roleName += `，${item.roleName}`
      })
      return roleName
    }

    const createCol = (array, i) => {
      const layout = {
        style: {
          padding: '5px'
        }
      }
      return (
        <Col span={12} {...layout} key={i}>
          {array[0]}：{array[1]}
        </Col>
      )
    }

    const createRow = (array, i) => {
      return (
        <Row key={i}>
          {array.map((item, j) => createCol(item, j))}
        </Row>
      )
    }

    const getLevelType = (item, list) => {
      let ct = ''
      list.forEach(itm => {
        item === itm.paramKey ? ct = itm.paramValue : ''
      })
      return ct || ''
    }

    return (
      <div className='previewBox'>
        <Modal
          title='查看用户基本信息'
          width={680}
          visible={visible}
          onCancel={e => this.onClose()}
          footer={[
            <Button key='back' type='ghost' size='large' onClick={e => this.onClose()}>
              返 回
            </Button>
          ]}
        >
          {[
            [
              ['用户姓名', userName],
              ['用户邮箱', userEmail]
            ], [
              ['证件类型', getLevelType(userCertType, certType)],
              ['手机号码', userMobile]
            ], [
              ['岗位名称', postName],
              ['审批权限', userRight === '00000100' ? '有' : '无']
            ], [
              ['角色绑定', getRoleName(roleList)],
              ['登录用户', userLoginName]
            ], [
              ['用户描述', userDesc],
              ['用户住址', userAddress]
            ], [
              ['证件号码', userCertNo],
              ['所属机构', brhName]
            ], [
              ['用户等级', getLevelType(userLevel, level)]
            ]
          ].map((item, i) => createRow(item, i))}
        </Modal>
      </div>
    )
  }
}
