import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Table, Spin, Icon } from 'antd'
import { releaseFilter, releaseStatusFilter, enterpriseFilter, upgradeTypeFilter, platformFilter } from 'UTIL/filters'
import * as updateManageActions from 'REDUCER/pages/updateManage'
import { queryWhiteList } from 'REDUCER/public/config'
import AddPackage from './AddPackage'
import AddEditRelease from './AddEditRelease'

@connect(
  state => {
    const { pages: { updateManage } } = state
    return {
      upgradeList: updateManage.upgradeList
    }
  },
  dispatch => bindActionCreators({ ...updateManageActions, queryWhiteList }, dispatch)
)

export default class UpgradeManageView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      taskList: {},
      mode: 'add',
      currentRelease: null
    }
  }

  componentWillMount () {
    this.props.queryUpdateList()
    this.props.queryWhiteList()
  }

  releaseItem (data) {
    this.setState({
      currentRelease: data,
      mode: 'add'
    })
    this.props.setAddEditRelVisible(true)
  }

  getSubList (record) {
    const id = record.id
    const list = this.state.taskList
    if (list[id]) {
      const lis = list[id]
      console.log(lis)
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
                <td className='panel'>
                  <a>修改</a>
                  <a>暂停</a>
                  <a>结束</a>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    }
    this.props.getUpgradeTask({packageInfoId: id}, data => {
      const newList = {
        ...this.state.taskList,
        [id]: data.versionTaskList
      }
      this.setState({
        taskList: newList
      })
    })
    return <div style={{textAlign: 'center'}}><Spin /></div>
  }

  render () {
    const { upgradeList, setAddPkgVisible } = this.props

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
      dataIndex: 'productVersion',
      key: 'operation',
      render: (text, record, index) => <a onClick={e => this.releaseItem(upgradeList[index])}>创建发布</a>
    }]

    return (
      <div className='upgradeManage' style={{padding: '20px 30px'}}>
        <div style={{paddingBottom: '20px'}}>
          <Button
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
        <AddEditRelease
          itemInfo={this.state.currentRelease}
          mode={this.state.mode}
        />
      </div>
    )
  }
}
