import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Modal, TreeSelect } from 'antd'
import { closeBindRole } from 'REDUCER/pages/userManage'
import { updateSelectedRole, userRoleAssociation } from 'REDUCER/public/bindRole'

const FormItem = Form.Item
const SHOW_PARENT = TreeSelect.SHOW_PARENT

@connect(
  state => {
    const {
      pages: {
        userManage: {
          bindRoleBox: {
            visible,
            info
          }
        }
      },
      public: {
        bindRole: {
          selectRoleTreeList,
          selectedRoleList,
          allSelectRoleList
        }
      }
    } = state
    return {
      visible,
      treeNodes: selectRoleTreeList,
      selectedRoleList,
      allSelectRoleList,
      info
    }
  },
  dispatch => bindActionCreators({ closeBindRole, updateSelectedRole, userRoleAssociation }, dispatch)
)

@Form.create()

export default class BindRoleBoxView extends React.Component {

  onClose () {
    this.props.closeBindRole()
  }

  onSubmit () {
    const { info, selectedRoleList, allSelectRoleList, userRoleAssociation } = this.props
    const { userNo, userName } = info
    let roleList = []
    selectedRoleList.map((sr, i) => {
      allSelectRoleList.map((rr, j) => {
        let outerkey = rr.roleId
        outerkey === sr ? roleList.push({
          roleId: sr,
          roleName: rr.roleName
        }) : null
      })
    })

    // 获取所有角色和已经关联的角色
    userRoleAssociation(userNo, userName, roleList)
    this.onClose()
  }

  render () {
    const { visible, treeNodes, selectedRoleList, updateSelectedRole } = this.props
    const onChange = value => updateSelectedRole(value)
    const treeProps = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: treeNodes,
      onChange: onChange,
      value: selectedRoleList,
      defaultValue: selectedRoleList,
      placeholder: '请选择',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT,
      multiple: true
    }

    return (
      <div className='bindBox'>
        <Modal
          title='角色绑定'
          width={680}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
            <Button key='back' type='ghost' size='large' onClick={e => this.onClose()}>
              返 回
            </Button>,
            <Button
              key='submit'
              type='primary'
              size='large'
              onClick={e => this.onSubmit()}
            >
              提 交
            </Button>
          ]}
        >
          <Form layout='horizontal'>
            <FormItem
              label='角色选择：'
              required
              labelCol={{span: 6}}
              wrapperCol={{span: 14}}
            >
              <TreeSelect {...treeProps} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

