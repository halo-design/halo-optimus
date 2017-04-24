import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'antd'
import InputSearch from 'COMPONENT/InputSearch'
import RoleTree from 'COMPONENT/RoleTree'
import EditRole from './EditRole'
import ItemsTable from './ItemsTable'
import { getRoleTree } from 'REDUCER/public/bindRole'
import * as roleManageActions from 'REDUCER/pages/roleManage'

@connect(
  state => ({
    roleTreeList: state.public.bindRole.roleTreeList,
    curRoleId: state.pages.roleManage.curRoleInfo.roleId
  }),
  dispatch => bindActionCreators({ ...roleManageActions, getRoleTree }, dispatch)
)

export default class RoleManage extends React.Component {

  constructor (props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
    this.roleSelected = this.roleSelected.bind(this)
  }

  onSearch (roleName) {
    const { getInfoByRoleName } = this.props
    getInfoByRoleName(roleName)
  }

  roleSelected (info) {
    const { roleId, title } = info
    const { getAllRoleFnItems, getInfoByRoleId } = this.props
    getAllRoleFnItems(1, roleId, title, 1)
    getAllRoleFnItems(1, roleId, title, 2)
    getAllRoleFnItems(1, roleId, title)
    getInfoByRoleId(roleId)
  }

  componentWillMount () {
    this.props.getRoleTree()
  }

  componentWillUnmount () {
    this.props.clearCurRoleInfo()
  }

  render () {
    const { roleTreeList, curRoleId } = this.props
    return (
      <div className='pageRoleManage'>
        <Row>
          <Col span={5}>
            <div className='app-left-side'>
              <InputSearch
                placeholder='请输入角色名称'
                initialValue=''
                onSearch={this.onSearch}
              />
              <RoleTree
                selectedKeys={[curRoleId]}
                selected={this.roleSelected}
                roleList={roleTreeList}
              />
            </div>
          </Col>
          <Col span={19}>
            <EditRole />
            <div className='app-narrow-table' style={{padding: '0 20px'}}>
              <ItemsTable />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
