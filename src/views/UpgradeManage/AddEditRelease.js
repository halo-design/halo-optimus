import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Radio, Row, Col, Select, Input, DatePicker, message, Modal, InputNumber, Table, Popconfirm } from 'antd'
import Spin from 'COMPONENT/Spin'
import { setAddEditRelVisible, addUpgradeList } from 'REDUCER/pages/updateManage'
import { platformFilter } from 'UTIL/filters'
import AddRule from './AddRule'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

@connect(
  state => {
    const { pages: { updateManage }, public: { config } } = state
    return {
      visible: updateManage.addEditReleaseVisible,
      whiteList: config.whiteList
    }
  },
  dispatch => bindActionCreators({ setAddEditRelVisible, addUpgradeList }, dispatch)
)

@Form.create()

export default class AddEditRelease extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      publishType: '1',
      publishMode: '1',
      addRuleBoxVisible: false,
      ruleList: [{
        ruleElement: 'city',
        operation: '不包含',
        value: 10000140
      }]
    }
    this.setAddRuleBoxVisible = this.setAddRuleBoxVisible.bind(this)
  }

  setAddRuleBoxVisible (status) {
    this.setState({
      addRuleBoxVisible: status
    })
  }

  componentWillMount () {
    this.props.form.resetFields()
  }

  onClose () {
    this.props.setAddEditRelVisible(false)
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('请正确填写内容！')
      } else {
        const formData = getFieldsValue()
        console.log(formData)
        // const showSpin = () => {
        //   this.setState({
        //     loading: true
        //   })
        // }
        // const hideSpin = () => {
        //   this.setState({
        //     loading: false
        //   })
        // }
        // showSpin()
        // addUpgradeList(formData, () => {
        //   this.onClear()
        //   this.onClose()
        //   hideSpin()
        // }, hideSpin)
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

  render () {
    const { form, visible, whiteList, itemInfo, mode } = this.props
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
    console.log(isAdd)

    const grayPublic = () => (
      <div>
        <FormItem
          {...formItemLayout}
          label='发布模型'
        >
          {
            getFieldDecorator('publishMode', {
              initialValue: '1',
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
        {
          isWhiteList
          ? (
            <FormItem
              {...formItemLayout}
              label='白名单配置'
            >
              {
                getFieldDecorator('whitelistIds', {
                  rules: [{
                    type: 'array'
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
          )
          : (
            <div>
              <FormItem
                {...formItemLayout}
                label='结束时间'
              >
                {
                  getFieldDecorator('realGreyEndtimeStr', {
                    initialValue: ''
                  })(
                    <DatePicker
                      showTime={false}
                      format='YYYY-MM-DD'
                      placeholder='请选择时间'
                      disabledDate={disabledDate}
                    />
                  )
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='灰度人数'
              >
                {
                  getFieldDecorator('greyNum', {
                    initialValue: 1000
                  })(
                    <InputNumber style={{ width: '100%' }} />
                  )
                }
              </FormItem>
            </div>
          )
        }
      </div>
    )

    const columns = [{
      title: '规则元素',
      dataIndex: 'ruleElement',
      key: 'ruleElement'
    }, {
      title: '规则运算',
      dataIndex: 'operation',
      key: 'operation'
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
                  initialValue: '1',
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
            <FormItem
              {...formItemLayout}
              label='升级模式'
            >
              {
                getFieldDecorator('upgradeType', {
                  initialValue: '1',
                  rules: [{
                    required: true
                  }]
                })(
                  <RadioGroup>
                    <Radio value='1'>单次</Radio>
                    <Radio value='2'>多次</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            {!isOffical && grayPublic()}
            <FormItem
              {...formItemLayout}
              label='升级提示信息'
            >
              {
                getFieldDecorator('upgradeContent', {
                  initialValue: '欢迎使用新版本'
                })(
                  <Input
                    type='textarea'
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='发布描述'
            >
              {
                getFieldDecorator('memo', {
                  initialValue: '新版本发布'
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
