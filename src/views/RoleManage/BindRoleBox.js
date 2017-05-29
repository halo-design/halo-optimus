import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button, Modal } from 'antd'
import Spin from 'COMPONENT/Spin'
import * as roleManageActions from 'REDUCER/pages/roleManage'

@connect(
  state => {
    const {
      pages: {
        roleManage: {
          bindBoxVisible,
          pageSize,
          allMenuTotalSize,
          allMenuFnCurPage,
          allMenuFnSelectKeys,
          allMenuFnCurPageItems,
          curRoleInfo: { roleId }
        }
      }
    } = state
    return {
      pageSize,
      visible: bindBoxVisible,
      totalSize: allMenuTotalSize,
      curPage: allMenuFnCurPage,
      selectKeys: allMenuFnSelectKeys,
      dataSource: allMenuFnCurPageItems,
      curRoleId: roleId
    }
  },
  dispatch => bindActionCreators({ ...roleManageActions }, dispatch)
)

export default class BindRoleBoxView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onClose () {
    this.props.setBindRoleBoxVisible(false)
  }

  onSubmit () {
    const { curRoleId, selectKeys, itemsBindRole } = this.props
    let key = []

    selectKeys.map(item => {
      key.push({
        menuItemId: item
      })
    })

    const showSpin = () => {
      this.setState({
        loading: true
      })
    }

    const hideSpin = () => {
      this.setState({
        loading: false
      })
    }

    showSpin()
    itemsBindRole(curRoleId, key, () => {
      hideSpin()
      this.onClose()
    }, hideSpin)
  }

  render () {
    const { visible, getAllRoleFnItems, totalSize, pageSize, curPage, curRoleId, selectKeys, dataSource, setAllMenuFnSelectKeys } = this.props

    const columns = [{
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    }, {
      title: '功能名称',
      dataIndex: 'menuItemName',
      key: 'menuItemName'
    }]

    let pagination = {
      total: Number(totalSize),
      showQuickJumper: true,
      pageSize: pageSize,
      current: curPage,
      onChange (current) {
        getAllRoleFnItems(current, curRoleId, '')
      }
    }

    let rowSelection = {
      selectedRowKeys: selectKeys,
      onChange (selectedRowKeys) {
        let newSelectKeys = [].concat(selectedRowKeys)
        setAllMenuFnSelectKeys(newSelectKeys)
      }
    }

    return (
      <div className='BindRoleBox'>
        <Modal
          title='关联功能'
          width={600}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
            <Button
              key='back'
              type='ghost'
              size='large'
              onClick={e => this.onClose()}
            >
              返 回
            </Button>,
            <Button
              key='submit'
              type='primary'
              size='large'
              onClick={e => this.onSubmit()}
            >
              保存
            </Button>
          ]}
        >
          <div className='app-narrow-table'>
            <Table
              columns={columns}
              bordered
              rowSelection={rowSelection}
              dataSource={dataSource}
              pagination={pagination}
            />
          </div>
          <Spin loading={this.state.loading} />
        </Modal>
      </div>
    )
  }
}
