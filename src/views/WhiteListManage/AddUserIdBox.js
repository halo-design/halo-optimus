import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Modal, message } from 'antd'
import Spin from 'COMPONENT/effects/Spin'
import { setAddUserIdState, addUserId } from 'REDUCER/pages/whiteListManage'

const FormItem = Form.Item

@connect(
  state => {
    const {
      pages: {
        whiteListManage: {
          addUserIdState: {
            visible,
            itemInfo
          }
        }
      }
    } = state
    return {
      visible,
      itemInfo
    }
  },
  dispatch => bindActionCreators({ setAddUserIdState, addUserId }, dispatch)
)

@Form.create()

export default class AddUserIdBoxView extends React.Component {

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
    this.props.setAddUserIdState({
      visible: false
    })
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form, addUserId, itemInfo } = this.props
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
        addUserId({
          keyIds: formData.keyIds,
          id: itemInfo.id,
          idType: 'userid'
        }, () => {
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
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }

    return (
      <div className='AddRoleBox'>
        <Modal
          title='添加白名单用户'
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
                    placeholder='请输入白单名称，可输入多个userId，用英文(半角)逗号分隔'
                    type='textarea'
                    rows={6}
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
