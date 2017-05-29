import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Select, Modal, message } from 'antd'
import Spin from 'COMPONENT/Spin'
import { setAddEditResouceState, addResourceList, changeResourceList } from 'REDUCER/pages/resourceManage'

const FormItem = Form.Item
const Option = Select.Option

@connect(
  state => {
    const {
      pages: {
        resourceManage: {
          addEditResourceState: {
            mode,
            visible,
            initData
          }
        }
      }
    } = state
    return {
      mode,
      visible,
      initData
    }
  },
  dispatch => bindActionCreators({ setAddEditResouceState, addResourceList, changeResourceList }, dispatch)
)

@Form.create()

export default class AddEditResourceBoxView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount () {
    this.props.form.resetFields()
  }

  onClose () {
    this.props.setAddEditResouceState({
      mode: 'add',
      visible: false,
      initData: null
    })
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form, mode, initData, addResourceList, changeResourceList } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('请正确填写内容！')
      } else {
        let formData = getFieldsValue()
        let submit = addResourceList

        if (mode === 'modify') {
          formData = {
            ...formData,
            id: initData.id
          }
          submit = changeResourceList
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
        submit(formData, () => {
          this.onClear()
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  render () {
    const { visible, form, mode, initData } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }

    const isAdd = mode === 'add'

    return (
      <div className='addEditResourceBox'>
        <Modal
          title={isAdd ? '添加资源' : '修改资源'}
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
              提 交
            </Button>
          ]}
        >
          <Form layout='horizontal'>
            <FormItem
              {...formItemLayout}
              label='资源类型'
            >
              {
                getFieldDecorator('resourceType', {
                  rules: [{
                    required: true,
                    whitespace: true
                  }],
                  initialValue: isAdd ? 'city' : initData.resourceType
                })(
                  <Select>
                    <Option value='city'>城市</Option>
                    <Option value='mobileModel'>机型</Option>
                    <Option value='netType'>网络</Option>
                    <Option value='osVersion'>osVersion</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='平台类型'
            >
              {
                getFieldDecorator('platform', {
                  rules: [{
                    required: true,
                    whitespace: true
                  }],
                  initialValue: isAdd ? '0' : initData.platform
                })(
                  <Select>
                    <Option value='0'>平台无关</Option>
                    <Option value='1'>Android</Option>
                    <Option value='2'>iOS</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              label='资源名称'
              {...formItemLayout}
              required
            >
              {
                getFieldDecorator('resourceName', {
                  initialValue: isAdd ? '' : initData.resourceName,
                  rules: [
                    {
                      required: true,
                      message: '请输入资源名称',
                      whitespace: true
                    }
                  ]
                })(
                  <Input
                    placeholder='请输入资源名称'
                    size='large'
                  />
                )
              }
            </FormItem>
            <FormItem
              label='资源值'
              {...formItemLayout}
              required
            >
              {
                getFieldDecorator('resourceValue', {
                  initialValue: isAdd ? '' : initData.resourceValue,
                  rules: [
                    {
                      required: true,
                      message: '请输入资源值',
                      whitespace: true
                    }
                  ]
                })(
                  <Input
                    placeholder='请输入资源值'
                    size='large'
                  />
                )
              }
            </FormItem>
          </Form>
          <Spin loading={this.state.loading} />
        </Modal>
      </div>
    )
  }
}
