import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table } from 'antd'
import { getAllRoleFnItems, clearTableItems } from 'REDUCER/pages/roleManage'

@connect(
  state => {
    const {
      pages: {
        roleManage: {
          pageSize,
          tableTotalSize,
          tableCurPage,
          tableCurPageItems,
          curRoleInfo: { roleId }
        }
      }
    } = state
    return {
      pageSize,
      totalSize: tableTotalSize,
      curPage: tableCurPage,
      dataSource: tableCurPageItems,
      curRoleId: roleId
    }
  },
  dispatch => bindActionCreators({ getAllRoleFnItems, clearTableItems }, dispatch)
)

export default class ItemsTable extends React.Component {

  componentWillUnmount () {
    this.props.clearTableItems()
  }

  render () {
    const { getAllRoleFnItems, totalSize, pageSize, curPage, curRoleId, dataSource } = this.props
    const columns = [{
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    }, {
      title: '功能名称',
      dataIndex: 'menuItemName',
      key: 'menuItemName'
    }]

    const pagination = {
      total: Number(totalSize),
      showQuickJumper: true,
      pageSize: pageSize,
      current: curPage,
      onChange (current) {
        getAllRoleFnItems(current, curRoleId, '', 1)
      }
    }

    return (
      <Table
        columns={columns}
        bordered
        dataSource={dataSource}
        pagination={pagination}
      />
    )
  }
}

