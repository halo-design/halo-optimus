import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button, Popconfirm } from 'antd'
import AddEditResourceBox from './AddEditResourceBox'
import { platformFilter, resourceFilter } from 'UTIL/filters'
import * as resourceManageActions from 'REDUCER/pages/resourceManage'

@connect(
  state => {
    const {
      pages: {
        resourceManage: {
          resourceList
        }
      }
    } = state
    return {
      resourceList
    }
  },
  dispatch => bindActionCreators({ ...resourceManageActions }, dispatch)
)

export default class ResourceManageView extends React.Component {

  addResource (info) {
    this.props.setAddEditResouceState({
      mode: 'add',
      visible: true
    })
  }

  changeResource (info) {
    this.props.setAddEditResouceState({
      mode: 'modify',
      visible: true,
      initData: info
    })
  }

  delResource (id) {
    this.props.delResource({ id })
  }

  componentWillMount () {
    this.props.queryResourceList()
  }

  render () {
    const { resourceList } = this.props

    const columns = [
      {
        title: '资源类型',
        dataIndex: 'resourceType',
        key: 'resourceType',
        render: text => <span>{resourceFilter(text)}</span>
      }, {
        title: '平台类型',
        dataIndex: 'platform',
        key: 'platform',
        render: text => <span>{platformFilter(text)}</span>
      }, {
        title: '资源名称',
        dataIndex: 'resourceName',
        key: 'resourceName'
      }, {
        title: '资源值',
        dataIndex: 'resourceValue',
        key: 'resourceValue'
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            <Popconfirm
              title='确定要删除吗？'
              onConfirm={() => this.delResource(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <a>删除</a>
            </Popconfirm>
            <span className='ant-divider' />
            <a onClick={e => { this.changeResource(record) }}>修改</a>
          </span>
        )
      }
    ]

    return (
      <div className='pageWhiteList'>
        <div style={{padding: '20px 30px', textAlign: 'right'}}>
          <Button
            size='large'
            type='primary'
            icon='plus-circle-o'
            onClick={e => this.addResource()}
          >
            添加资源
          </Button>
        </div>
        <div className='app-narrow-table' style={{padding: '0 30px'}}>
          <Table
            rowKey='id'
            columns={columns}
            dataSource={resourceList}
            bordered
          />
          <AddEditResourceBox />
        </div>
      </div>
    )
  }
}
