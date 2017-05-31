import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Select, Modal, message } from 'antd'
import Spin from 'COMPONENT/effects/Spin'
import { setAddWhiteListVisible, addWhiteList } from 'REDUCER/pages/whiteListManage'

const FormItem = Form.Item
const Option = Select.Option

@connect(
  state => {
    const {
      pages: {
        whiteListManage: {
          addWhiteListVisible
        }
      }
    } = state
    return {
      visible: addWhiteListVisible
    }
  },
  dispatch => bindActionCreators({ setAddWhiteListVisible, addWhiteList }, dispatch)
)

@Form.create()

export default class AddWhiteListBoxView extends React.Component {

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
    this.props.setAddWhiteListVisible(false)
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form, addWhiteList } = this.props
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
        addWhiteList(formData, () => {
          this.onClear()
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  render () {
    const { visible, form } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }

    return (
      <div className='AddRoleBox'>
        <Modal
          title='添加资源'
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
              label='白名单名称'
              {...formItemLayout}
              required
            >
              {
                getFieldDecorator('whiteListName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入白单名称',
                      whitespace: true
                    }
                  ]
                })(
                  <Input
                    placeholder='请输入白单名称'
                    size='large'
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='业务分类'
            >
              {
                getFieldDecorator('business', {
                  rules: [{
                    required: true,
                    whitespace: true
                  }],
                  initialValue: 'hotpatch'
                })(
                  <Select>
                    <Option value='hotpatch'>热修复</Option>
                    <Option value='upgrade'>升级</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='白名单类型'
            >
              {
                getFieldDecorator('idType', {
                  rules: [{
                    required: true,
                    whitespace: true
                  }],
                  initialValue: 'userid'
                })(
                  <Select>
                    <Option value='userid'>用户白名单</Option>
                  </Select>
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
