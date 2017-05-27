import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button, Popconfirm } from 'antd'
import AddWhiteListBox from './AddWhiteListBox'
import AddUserIdBox from './AddUserIdBox'
import * as whiteListManageActions from 'REDUCER/pages/whiteListManage'

@connect(
  state => {
    const {
      pages: {
        whiteListManage: {
          whiteList
        }
      }
    } = state
    return {
      whiteList
    }
  },
  dispatch => bindActionCreators({ ...whiteListManageActions }, dispatch)
)

export default class WhiteListManage extends React.Component {

  addList () {
    this.props.setAddWhiteListVisible(true)
  }

  addListId (info) {
    this.props.setAddUserIdState({
      visible: true,
      itemInfo: info
    })
  }

  delList (id) {
    this.props.delWhiteList({ id })
  }

  componentWillMount () {
    this.props.queryWhiteList()
  }

  render () {
    const { whiteList } = this.props

    const columns = [
      {
        title: '白名单名称',
        dataIndex: 'whiteListName',
        key: 'whiteListName'
      }, {
        title: '白名单类型',
        dataIndex: 'idType',
        key: 'idType'
      }, {
        title: '业务类型',
        dataIndex: 'business',
        key: 'business'
      }, {
        title: '白名单数量',
        dataIndex: 'whiteListCount',
        key: 'whiteListCount'
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            <Popconfirm
              title='确定要删除吗？'
              onConfirm={() => this.delList(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <a>删除</a>
            </Popconfirm>
            <span className='ant-divider' />
            <a onClick={e => { this.addListId(record) }}>增加</a>
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
            onClick={e => this.addList()}
          >
            添加白名单
          </Button>
        </div>
        <div className='app-narrow-table' style={{padding: '0 30px'}}>
          <Table
            rowKey='id'
            columns={columns}
            dataSource={whiteList}
            bordered
          />
        </div>
        <AddWhiteListBox />
        <AddUserIdBox />
      </div>
    )
  }
}
