import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Form, Button, Radio, Row, Col, Select, Input, DatePicker, message, Modal, InputNumber, Table, Popconfirm } from 'antd'
import Spin from 'COMPONENT/Spin'
import * as hotpatchManageActions from 'REDUCER/pages/hotpatchManage'
import { getResourceList } from 'REDUCER/public/config'
import { platformFilter, operationFilter, ruleElementFilter, whitelistIdsFilter, formatGreyConfigInfo } from 'UTIL/filters'
import AddRule from './AddRule'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

@connect(
  state => {
    const {
      pages: {
        hotpatchManage: {
          addEditHotpatchState: { mode, taskId, initData, itemInfo, visible }
        }
      },
      public: {
        config: {
          whiteList,
          resourceList
        }
      }
    } = state
    return {
      mode,
      taskId,
      initData,
      itemInfo,
      visible,
      resourceList,
      whiteList
    }
  },
  dispatch => bindActionCreators({ ...hotpatchManageActions, getResourceList }, dispatch)
)

@Form.create()

export default class AddEditHotpatchTask extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      publishType: '1',
      publishMode: '1',
      addRuleBoxVisible: false,
      ruleList: []
    }
    this.setAddRuleBoxVisible = this.setAddRuleBoxVisible.bind(this)
    this.addRow = this.addRow.bind(this)
  }

  reset () {
    const { form, mode, initData } = this.props
    if (mode === 'add') {
      this.setState({
        publishType: '1',
        publishMode: '1'
      })
      form.resetFields()
    } else {
      this.setState({
        publishType: initData.publishType,
        publishMode: initData.publishMode,
        ruleList: formatGreyConfigInfo(initData.greyConfigInfo)
      })
    }
  }

  setAddRuleBoxVisible (status) {
    this.setState({
      addRuleBoxVisible: status
    })
  }

  componentWillMount () {
    this.reset()
  }

  onClose () {
    this.props.setAddEditHotpatchState({
      visible: false
    })
    this.reset()
  }

  onSubmit () {
    const { form, itemInfo, addHotpatchTask, mode, taskId } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('请正确填写内容！')
      } else {
        let formData = getFieldsValue()
        formData = {
          ...formData,
          greyConfigInfo: JSON.stringify(this.state.ruleList),
          hotpatchId: itemInfo.id
        }
        if (formData.whitelistIds) {
          let ids = formData.whitelistIds
          formData.whitelistIds = ids.join(',')
        }
        if (formData.realGreyEndtime) {
          let time = formData.realGreyEndtime
          formData.realGreyEndtime = `${time.format('YYYYMMDD')}000000`
        }
        if (mode === 'modify') {
          formData.id = taskId
        }

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
        addHotpatchTask(formData, () => {
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  publishTypeChange (val) {
    this.setState({
      publishType: val
    })
  }

  publishModeChange (val) {
    this.setState({
      publishMode: val
    })
  }

  deleteRow (index) {
    const ruleList = [...this.state.ruleList]
    ruleList.splice(index, 1)
    this.setState({ ruleList })
  }

  addRow (data) {
    const ruleList = [...this.state.ruleList]
    ruleList.push(data)
    this.setState({ ruleList })
  }

  render () {
    const { form, visible, whiteList, itemInfo, mode, resourceList, getResourceList, initData } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    }
    const isAdd = mode === 'add'
    const isOffical = this.state.publishType === '2'
    const isWhiteList = this.state.publishMode === '1'

    const disabledDate = current => current && current.valueOf() < Date.now()

    const modTitle = itemInfo && (`${isAdd ? '创建发布任务' : '修改发布任务'}  ${platformFilter(itemInfo.platform)}  ${itemInfo.productVersion}`)

    const columns = [{
      title: '规则元素',
      dataIndex: 'ruleElement',
      key: 'ruleElement',
      render: (text, record) => (
        <span>{ruleElementFilter(record.ruleElement)}</span>
      )
    }, {
      title: '规则运算',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span>{operationFilter(record.operation)}</span>
      )
    }, {
      title: '规则值名称',
      dataIndex: 'value',
      key: 'value'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Popconfirm
          title='确定要删除吗？'
          okText='确定'
          cancelText='取消'
          onConfirm={() => this.deleteRow(index)}
        >
          <a>删除</a>
        </Popconfirm>
      )
    }]
    if (!isAdd && !initData) {
      return null
    }

    const defaultTime = !isAdd && initData.realGreyEndtime ? moment(initData.realGreyEndtime, 'YYYY-MM-DD') : moment().add(1, 'days')

    return (
      <div className='addEditRelease'>
        <Modal
          title={modTitle}
          width={860}
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
              提 交
            </Button>
          ]}
        >
          <Form layout='horizontal'>
            <FormItem
              {...formItemLayout}
              label='发布类型'
            >
              {
                getFieldDecorator('publishType', {
                  initialValue: isAdd ? '1' : initData.publishType,
                  rules: [{
                    required: true
                  }]
                })(
                  <RadioGroup onChange={e => this.publishTypeChange(e.target.value)}>
                    <Radio value='1'>灰度</Radio>
                    <Radio value='2'>正式</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            {
              !isOffical &&
              <FormItem
                {...formItemLayout}
                label='发布模型'
              >
                {
                  getFieldDecorator('publishMode', {
                    initialValue: isAdd ? '1' : initData.publishMode,
                    rules: [{
                      required: true
                    }]
                  })(
                    <RadioGroup onChange={e => this.publishModeChange(e.target.value)}>
                      <Radio value='1'>白名单</Radio>
                      <Radio value='2'>时间窗</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
            }
            {
              !isOffical && isWhiteList &&
              <FormItem
                {...formItemLayout}
                label='白名单配置'
              >
                {
                  getFieldDecorator('whitelistIds', {
                    initialValue: isAdd ? [] : whitelistIdsFilter(initData.whitelistIds),
                    rules: [{
                      type: 'array',
                      required: true,
                      message: '请选择白名单'
                    }]
                  })(
                    <Select mode='multiple' placeholder='请选择白名单'>
                      {
                        whiteList.map(item => (
                          <Option
                            key={item.id}
                            value={item.id}
                          >
                            {item.whiteListName}
                          </Option>
                        ))
                      }
                    </Select>
                  )
                }
              </FormItem>
            }
            {
              !isOffical && !isWhiteList &&
              <FormItem
                {...formItemLayout}
                label='结束时间'
              >
                {
                  getFieldDecorator('realGreyEndtime', {
                    initialValue: defaultTime,
                    rules: [{
                      required: true,
                      message: '请选择结束时间'
                    }]
                  })(
                    <DatePicker
                      showToday={false}
                      format='YYYY-MM-DD'
                      placeholder='请选择时间'
                      disabledDate={disabledDate}
                    />
                  )
                }
              </FormItem>
            }
            {
              !isOffical && !isWhiteList &&
              <FormItem
                {...formItemLayout}
                label='灰度人数'
              >
                {
                  getFieldDecorator('greyNum', {
                    initialValue: isAdd ? 1000 : initData.greyNum * 1
                  })(
                    <InputNumber style={{ width: '100%' }} />
                  )
                }
              </FormItem>
            }
            <FormItem
              {...formItemLayout}
              label='发布描述'
            >
              {
                getFieldDecorator('memo', {
                  initialValue: isAdd ? 'hotpatch发布' : initData.memo
                })(
                  <Input
                    type='textarea'
                  />
                )
              }
            </FormItem>
            {
              !isOffical && (
                <span>
                  <FormItem
                    {...formItemLayout}
                    label='高级规则'
                  >
                    <Table
                      bordered
                      size='small'
                      rowKey='value'
                      columns={columns}
                      dataSource={this.state.ruleList}
                      pagination={false}
                    />
                  </FormItem>
                  <Row style={{padding: '0 0 10px'}}>
                    <Col span={5} />
                    <Col span={16}>
                      <Button
                        type='dashed'
                        icon='plus'
                        size='large'
                        style={{ width: '100%' }}
                        onClick={e => this.setAddRuleBoxVisible(true)}
                      >
                        添加
                      </Button>
                    </Col>
                  </Row>
                  <AddRule
                    addRow={this.addRow}
                    itemInfo={itemInfo}
                    resourceList={resourceList}
                    getResourceList={getResourceList}
                    visible={this.state.addRuleBoxVisible}
                    setVisible={this.setAddRuleBoxVisible}
                  />
                </span>
              )
            }
          </Form>
          <Spin loading={this.state.loading} />
        </Modal>
      </div>
    )
  }
}
