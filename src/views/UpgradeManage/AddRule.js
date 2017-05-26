import React from 'react'
import { Form, Button, message, Select, Modal, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

@Form.create()

export default class AddRule extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      ruleElement: 'city',
      operation: '1'
    }
  }

  reset () {
    this.setState({
      ruleElement: 'city',
      operation: '1'
    })
    this.props.form.resetFields()
  }

  componentWillMount () {
    const { getResourceList, itemInfo } = this.props
    getResourceList({
      platform: itemInfo.platform,
      resourceType: this.state.ruleElement
    })
    this.reset()
  }

  onClose () {
    this.props.setVisible(false)
    this.reset()
  }

  onSubmit () {
    const { form, addRow } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('请正确填写内容！')
      } else {
        let formData = getFieldsValue()
        if (formData.value1 && formData.value2) {
          formData = {
            ...formData,
            value: `${formData.value1} - ${formData.value2}`
          }
        } else {
          formData = {
            ...formData,
            value: formData.value.join(', ')
          }
        }
        console.log(formData)
        addRow(formData)
        this.onClose()
      }
    })
  }

  typeChange (val) {
    const { getResourceList, itemInfo } = this.props
    this.setState({
      ruleElement: val
    })
    getResourceList({
      platform: itemInfo.platform,
      resourceType: val
    })
  }

  operationChange (val) {
    this.setState({
      operation: val
    })
  }

  render () {
    const { visible, form, resourceList } = this.props
    const { ruleElement, operation } = this.state
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }

    const typeFlag = ruleElement === 'version' || ruleElement === 'osVersion'
    const operateFlag = operation === '1' || operation === '2'

    const resourceOpt = resourceList.map(item => (
      <Option key={item.id} value={item.resourceName}>
        {item.resourceName}
      </Option>
    ))

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
            <FormItem
              {...formItemLayout}
              label='类型'
            >
              {getFieldDecorator('ruleElement', {
                rules: [{
                  required: true
                }],
                initialValue: 'city'
              })(
                <Select onChange={val => this.typeChange(val)}>
                  <Option value='version'>版本号</Option>
                  <Option value='city'>城市</Option>
                  <Option value='mobileModel'>机型</Option>
                  <Option value='netType'>网络</Option>
                  <Option value='osVersion'>OS版本</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label='操作类型'
              {...formItemLayout}
              required
            >
              {
                getFieldDecorator('operation', {
                  initialValue: '1'
                })(
                  <RadioGroup onChange={e => this.operationChange(e.target.value)}>
                    <Radio value='1'>包含</Radio>
                    <Radio value='2'>不包含</Radio>
                    {typeFlag && <Radio value='3'>范围内</Radio>}
                    {typeFlag && <Radio value='4'>范围外</Radio>}
                  </RadioGroup>
                )
              }
            </FormItem>
            {
              operateFlag &&
              <FormItem
                {...formItemLayout}
                label='资源值'
              >
                {getFieldDecorator('value', {
                  rules: [{
                    required: true,
                    message: '请选择资源值',
                    type: 'array'
                  }]
                })(
                  <Select mode='multiple' placeholder='请选择资源值'>
                    {resourceOpt}
                  </Select>
                )}
              </FormItem>
            }
            {
              !operateFlag &&
              <FormItem
                {...formItemLayout}
                label='资源值上限'
              >
                {
                  getFieldDecorator('value1', {
                    rules: [{
                      required: true,
                      message: '请选择资源值'
                    }]
                  })(
                    <Select placeholder='请选择资源值'>
                      {resourceOpt}
                    </Select>
                  )
                }
              </FormItem>
            }
            {
              !operateFlag &&
              <FormItem
                {...formItemLayout}
                label='资源值下限'
              >
                {
                  getFieldDecorator('value2', {
                    rules: [{
                      required: true,
                      message: '请选择资源值'
                    }]
                  })(
                    <Select placeholder='请选择资源值'>
                      {resourceOpt}
                    </Select>
                  )
                }
              </FormItem>
            }
          </Form>
        </Modal>
      </div>
    )
  }
}
