import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Radio, Input, message, Modal } from 'antd'
import Spin from 'COMPONENT/Spin'
import { setAddPkgVisible, addUpgradeList } from 'REDUCER/pages/updateManage'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

@connect(
  state => {
    const { pages: { updateManage } } = state
    return {
      visible: updateManage.addPkgVisible
    }
  },
  dispatch => bindActionCreators({ setAddPkgVisible, addUpgradeList }, dispatch)
)

@Form.create()

export default class AddPackage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      platformType: '1'
    }
  }

  componentWillMount () {
    this.props.form.resetFields()
  }

  onClose () {
    this.props.setAddPkgVisible(false)
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form, addUpgradeList } = this.props
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
        addUpgradeList(formData, () => {
          this.onClear()
          this.onClose()
          hideSpin()
        }, hideSpin)
      }
    })
  }

  platformChange (val) {
    this.setState({
      platformType: val
    })
    this.onClear()
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

    const isIOS = this.state.platformType === '2'

    const allFormItems = () => (
      <div>
        {
          isIOS &&
          <FormItem
            {...formItemLayout}
            label='发布类型'
          >
            {
              getFieldDecorator('isEnterprise', {
                initialValue: '0',
                rules: [{
                  required: true
                }]
              })(
                <RadioGroup>
                  <Radio value='0'>企业版</Radio>
                  <Radio value='1'>正式版</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
        }
        {
          isIOS &&
          <FormItem
            {...formItemLayout}
            label='appstore地址'
          >
            {
              getFieldDecorator('appstoreUrl', {
                rules: [{
                  required: true,
                  message: '请输入appstore地址',
                  whitespace: true
                }]
              })(
                <Input
                  placeholder='请输入appstore地址'
                />
              )
            }
          </FormItem>
        }
        {
          isIOS &&
          <FormItem
            {...formItemLayout}
            label='符号表文件'
          >
            {
              getFieldDecorator('iosSymbol', {
                rules: [{
                  required: true,
                  message: '请输入符号表文件地址',
                  whitespace: true
                }]
              })(
                <Input
                  placeholder='请输入符号表文件地址'
                />
              )
            }
          </FormItem>
        }
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
          label='版本号'
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
          label='发布描述'
        >
          {
            getFieldDecorator('desc', {
              initialValue: ''
            })(
              <Input
                type='textarea'
                placeholder='请输入发布描述'
              />
            )
          }
        </FormItem>
      </div>
    )

    return (
      <div className='AddPackageBox'>
        <Modal
          title='添加发布包'
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
                  <RadioGroup onChange={e => this.platformChange(e.target.value)}>
                    <RadioButton value='1'>Android</RadioButton>
                    <RadioButton value='2'>IOS</RadioButton>
                  </RadioGroup>
                )
              }
            </FormItem>
            {allFormItems()}
          </Form>
          <Spin loading={this.state.loading} />
        </Modal>
      </div>
    )
  }
}
