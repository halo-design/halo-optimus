import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Table, Spin, Icon, Popconfirm } from 'antd'
import WaitSpin from 'COMPONENT/Spin'
import { platformFilter, releaseFilter, releaseStatusFilter } from 'UTIL/filters'
import * as hotpatchManageActions from 'REDUCER/pages/hotpatchManage'
import { getTaskDetail } from 'REDUCER/pages/updateManage'
import { queryWhiteList } from 'REDUCER/public/config'
import AddHotpatch from './AddHotpatch'
import AddEditHotpatchTask from './AddEditHotpatchTask'

@connect(
  state => {
    const {
      pages: {
        hotpatchManage: {
          hotpatchList,
          hotpatchTaskList,
          addEditHotpatchState: { visible }
        }
      }
    } = state
    return {
      hotpatchList,
      hotpatchTaskList,
      addEditTaskVisible: visible
    }
  },
  dispatch => bindActionCreators({ ...hotpatchManageActions, queryWhiteList, getTaskDetail }, dispatch)
)

export default class HotpacthManageView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount () {
    this.props.queryHotpatchList()
    this.props.queryWhiteList()
  }

  addTask (data) {
    this.props.setAddEditHotpatchState({
      mode: 'add',
      itemInfo: data,
      visible: true
    })
  }

  modifyTask (record, task) {
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
    this.props.getTaskDetail({
      taskId: task.id
    }, data => {
      hideSpin()
      this.props.setAddEditHotpatchState({
        mode: 'modify',
        itemInfo: record,
        taskId: task.id,
        initData: data,
        visible: true
      })
    }, hideSpin)
  }

  changeTask (state, task) {
    this.props.changeTaskStatus({
      taskId: task.id,
      taskStatus: state,
      hotpatchId: task.hotpatchId
    })
  }

  getSubList (record) {
    const id = record.id
    const list = this.props.hotpatchTaskList
    if (list[id]) {
      const lis = list[id]
      return lis.length === 0
      ? <div className='subNoData'><Icon type='frown-o' /> 暂无数据</div>
      : <table className='subList'>
        <tbody>
          {
            lis.map((item, i) =>
              <tr key={i}>
                <td>{releaseFilter(item.publishMode)}</td>
                <td>{releaseStatusFilter(item.taskStatus)}</td>
                <td>{item.gmtModified}</td>
                {
                  item.taskStatus !== '2'
                  ? (
                    <td className='panel'>
                      <a onClick={e => this.modifyTask(record, item)}>修改</a>
                      {
                        item.taskStatus === '3'
                        ? (
                          <Popconfirm
                            title='确定要继续吗？'
                            onConfirm={e => this.changeTask(1, item)}
                            okText='确定'
                            cancelText='取消'
                          >
                            <a>继续</a>
                          </Popconfirm>
                        ) : (
                          <Popconfirm
                            title='确定要暂停吗？'
                            onConfirm={e => this.changeTask(3, item)}
                            okText='确定'
                            cancelText='取消'
                          >
                            <a>暂停</a>
                          </Popconfirm>
                        )
                      }
                      <Popconfirm
                        title='确定要结束吗？'
                        onConfirm={e => this.changeTask(2, item)}
                        okText='确定'
                        cancelText='取消'
                      >
                        <a>结束</a>
                      </Popconfirm>
                    </td>
                  ) : <td />
                }
              </tr>
            )
          }
        </tbody>
      </table>
    }
    this.props.getHotpatchTaskList({hotpatchId: id})
    return <div style={{textAlign: 'center'}}><Spin /></div>
  }

  render () {
    const { hotpatchList, addEditTaskVisible, setAddHotpatchVisible } = this.props

    const columns = [{
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
      render: record => <span>{platformFilter(record)}</span>
    }, {
      title: '资源名称',
      dataIndex: 'sourceName',
      key: 'sourceName',
      render: record => <span>{record || '暂无'}</span>
    }, {
      title: '资源类型',
      dataIndex: 'sourceType',
      key: 'sourceType'
    }, {
      title: '版本号',
      dataIndex: 'productVersion',
      key: 'productVersion'
    }, {
      title: '备注',
      dataIndex: 'memo',
      key: 'memo'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => <a onClick={e => this.addTask(hotpatchList[index])}>创建发布</a>
    }]

    return (
      <div className='hotpacthManage' style={{padding: '20px 30px'}}>
        <div style={{paddingBottom: '20px', textAlign: 'right'}}>
          <Button
            size='large'
            type='primary'
            icon='plus-circle-o'
            onClick={e => setAddHotpatchVisible(true)}
          >
            添加热修复
          </Button>
        </div>
        <Table
          bordered
          rowKey='id'
          columns={columns}
          expandedRowRender={record => this.getSubList(record)}
          dataSource={hotpatchList}
        />
        <AddHotpatch />
        {
          addEditTaskVisible && <AddEditHotpatchTask />
        }
        <WaitSpin loading={this.state.loading} />
      </div>
    )
  }
}
