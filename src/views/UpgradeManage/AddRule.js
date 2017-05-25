import React from 'react'
import { Form, Button, Input, Row, Col, message, Modal, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group

@Form.create()

export default class AddRule extends React.Component {

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
    this.props.setVisible(false)
  }

  onSubmit () {
    const { form } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('请正确填写内容！')
      } else {
        let formData = getFieldsValue()
        console.log(formData)
      }
    })
  }

  render () {
    const { visible, form } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }

    return (
      <div className='AddRuleBox'>
        <Modal
          title='添加高级规则'
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
            <Row>
              <Col span={11}>
                <FormItem
                  label='岗位名称：'
                  {...formItemLayout}
                  required
                >
                  {
                    getFieldDecorator('postName', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入岗位名称'
                        }
                      ]
                    })(
                      <Input
                        placeholder='请输入岗位名称'
                        size='large'
                      />
                    )
                  }
                </FormItem>
                <FormItem
                  label='状态：'
                  {...formItemLayout}
                  required
                >
                  {
                    getFieldDecorator('state', {
                      initialValue: '0',
                      rules: [{
                        message: ' '
                      }]
                    })(
                      <RadioGroup>
                        <Radio key='a' value='1'>可用</Radio>
                        <Radio key='b' value='0'>禁用</Radio>
                      </RadioGroup>
                    )
                  }
                </FormItem>
              </Col>

              <Col span={13}>
                <FormItem
                  label='备注：'
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('remark', {
                      initialValue: '0'
                    })(
                      <Input
                        placeholder='请输入备注'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    )
  }
}
