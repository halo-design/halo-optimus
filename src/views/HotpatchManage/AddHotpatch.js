import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Radio, Input, message, Modal } from 'antd'
import Spin from 'COMPONENT/Spin'
import { setAddHotpatchVisible, addHotpatchList } from 'REDUCER/pages/hotpatchManage'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

@connect(
  state => {
    const { pages: { hotpatchManage: { addHotpatchVisible } } } = state
    return {
      visible: addHotpatchVisible
    }
  },
  dispatch => bindActionCreators({ setAddHotpatchVisible, addHotpatchList }, dispatch)
)

@Form.create()

export default class AddHotpatchView extends React.Component {

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
    this.props.setAddHotpatchVisible(false)
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form, addHotpatchList } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('请正确填写内容！')
      } else {
        const formData = getFieldsValue()
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
        addHotpatchList(formData, () => {
          this.onClear()
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  render () {
    const { form, visible } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      }
    }

    return (
      <div className='AddHotpatchBox'>
        <Modal
          title='添加热修复'
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
            <FormItem style={{textAlign: 'center'}}>
              {
                getFieldDecorator('platform', {
                  rules: [{
                    required: true
                  }],
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <RadioButton value='1'>Android</RadioButton>
                    <RadioButton value='2'>IOS</RadioButton>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='下载地址'
            >
              {
                getFieldDecorator('downloadUrl', {
                  rules: [{
                    required: true,
                    message: '请输入下载地址',
                    whitespace: true
                  }]
                })(
                  <Input
                    placeholder='请输入下载地址'
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='目标版本'
            >
              {
                getFieldDecorator('productVersion', {
                  rules: [{
                    required: true,
                    message: '请指定版本号',
                    whitespace: true
                  }]
                })(
                  <Input
                    placeholder='请指定版本号'
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='修复描述'
            >
              {
                getFieldDecorator('memo', {
                  initialValue: ''
                })(
                  <Input
                    type='textarea'
                    placeholder='请输入修复描述'
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
