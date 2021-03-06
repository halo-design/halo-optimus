import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Table, Spin, Icon, Popconfirm } from 'antd'
import WaitSpin from 'COMPONENT/effects/Spin'
import { releaseFilter, releaseStatusFilter, enterpriseFilter, upgradeTypeFilter, platformFilter } from 'UTIL/filters'
import * as updateManageActions from 'REDUCER/pages/updateManage'
import { queryWhiteList } from 'REDUCER/public/config'
import AddPackage from './AddPackage'
import AddEditRelease from './AddEditRelease'

@connect(
  state => {
    const { pages: { updateManage } } = state
    return {
      addEditReleaseVisible: updateManage.addEditReleaseState.visible,
      upgradeList: updateManage.upgradeList,
      upgradeTaskList: updateManage.upgradeTaskList
    }
  },
  dispatch => bindActionCreators({ ...updateManageActions, queryWhiteList }, dispatch)
)

export default class UpgradeManageView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount () {
    this.props.queryUpdateList()
    this.props.queryWhiteList()
  }

  releaseItem (data) {
    this.props.setAddEditRelState({
      mode: 'add',
      itemInfo: data,
      visible: true
    })
  }

  modifyItem (record, task) {
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
      this.props.setAddEditRelState({
        mode: 'modify',
        itemInfo: record,
        taskId: task.id,
        initData: data,
        visible: true
      })
    }, hideSpin)
  }

  changeItem (state, task) {
    this.props.changeTaskStatus({
      taskId: task.id,
      taskStatus: state,
      packageInfoId: task.packageInfoId
    })
  }

  getSubList (record) {
    const id = record.id
    const list = this.props.upgradeTaskList
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
                  <td>{upgradeTypeFilter(item.upgradeType)}</td>
                  {
                    item.taskStatus !== '2'
                      ? (
                        <td className='panel'>
                          <a onClick={e => this.modifyItem(record, item)}>修改</a>
                          {
                            item.taskStatus === '3'
                              ? (
                                <Popconfirm
                                  title='确定要继续吗？'
                                  onConfirm={e => this.changeItem(1, item)}
                                  okText='确定'
                                  cancelText='取消'
                                >
                                  <a>继续</a>
                                </Popconfirm>
                              )
                              : (
                                <Popconfirm
                                  title='确定要暂停吗？'
                                  onConfirm={e => this.changeItem(3, item)}
                                  okText='确定'
                                  cancelText='取消'
                                >
                                  <a>暂停</a>
                                </Popconfirm>
                              )
                          }
                          <Popconfirm
                            title='确定要结束吗？'
                            onConfirm={e => this.changeItem(2, item)}
                            okText='确定'
                            cancelText='取消'
                          >
                            <a>结束</a>
                          </Popconfirm>
                        </td>
                      )
                      : <td />
                  }
                </tr>
              )
            }
          </tbody>
        </table>
    }
    this.props.getUpgradeTaskList({packageInfoId: id})
    return <div style={{textAlign: 'center'}}><Spin /></div>
  }

  render () {
    const { upgradeList, setAddPkgVisible, addEditReleaseVisible } = this.props

    const columns = [{
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
      render: record => <span>{platformFilter(record)}</span>
    }, {
      title: '版本号',
      dataIndex: 'productVersion',
      key: 'productVersion'
    }, {
      title: '发布状态',
      dataIndex: 'publishStatus',
      key: 'publishStatus',
      render: record => <span>{releaseFilter(record)}</span>
    }, {
      title: '发布包类型',
      dataIndex: 'isEnterprise',
      key: 'isEnterprise',
      render: record => <span>{enterpriseFilter(record)}</span>
    }, {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => <a onClick={e => this.releaseItem(upgradeList[index])}>创建发布</a>
    }]

    return (
      <div className='upgradeManage' style={{padding: '20px 30px'}}>
        <div style={{paddingBottom: '20px', textAlign: 'right'}}>
          <Button
            size='large'
            type='primary'
            icon='plus-circle-o'
            onClick={e => setAddPkgVisible(true)}
          >
            添加发布包
          </Button>
        </div>
        <Table
          bordered
          rowKey='id'
          columns={columns}
          expandedRowRender={record => this.getSubList(record)}
          dataSource={upgradeList}
        />
        <AddPackage />
        {
          addEditReleaseVisible && <AddEditRelease />
        }
        <WaitSpin loading={this.state.loading} />
      </div>
    )
  }
}
