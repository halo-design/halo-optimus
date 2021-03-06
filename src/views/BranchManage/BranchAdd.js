import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Row, Col, Select, TreeSelect, message, Modal } from 'antd'
import Spin from 'COMPONENT/effects/Spin'
import { setAddBranchVisible, branchAdd } from 'REDUCER/pages/branchManage'

const FormItem = Form.Item
const Option = Select.Option
const SHOW_PARENT = TreeSelect.SHOW_PARENT

@connect(
  state => {
    const {
      pages: {
        branchManage: { addBranchBoxVisible }
      },
      public: {
        branchTree: {
          selectTreeBranchList,
          allBranchList
        }
      }
    } = state
    return {
      visible: addBranchBoxVisible,
      branchNodes: selectTreeBranchList,
      allBranchList
    }
  },
  dispatch => bindActionCreators({ setAddBranchVisible, branchAdd }, dispatch)
)

@Form.create()

export default class BranchAddView extends React.Component {

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
    this.props.setAddBranchVisible(false)
    this.onClear()
  }

  onClear () {
    this.props.form.resetFields()
  }

  onSubmit () {
    const { form, allBranchList, branchAdd } = this.props
    const { getFieldsValue, validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        message.error('填写内容有错误，请仔细填写!')
      } else {
        let params = getFieldsValue()
        let level = ''
        switch (params.brhLevel) {
          case '等级1':
            level = '1'
            break
          case '等级2':
            level = '2'
            break
          case '等级3':
            level = '3'
            break
        }

        let selectBranchId = params.brhId
        let brhPName = ''
        allBranchList.map(item => {
          if (selectBranchId && item.brhId === selectBranchId) {
            brhPName = item.brhName
          }
        })

        const data = {
          ...getFieldsValue(),
          brhLevel: level,
          brhPName: brhPName,
          brhParentId: selectBranchId
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
        branchAdd(data, () => {
          hideSpin()
          this.onClear()
          this.onClose()
        }, hideSpin)
      }
    })
  }

  phoneNumberCheck (rule, value, callback) {
    const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (!reg.test(value)) {
      let str = '请输入有效的手机号码！'
      callback(str)
    } else {
      callback()
    }
  }

  render () {
    const { visible, branchNodes } = this.props
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    // 机构等级选择
    const setOptions = ['等级1', '等级2', '等级3'].map(
      item => <Option key={item} value={item}>{item}</Option>
    )

    const treeProps = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: branchNodes,
      placeholder: '请选择所属机构',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <div className='BranchAdd'>
        <Modal
          title='增加机构'
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
              key='clean'
              type='ghost'
              size='large'
              onClick={e => this.onClear()}
            >
              清除所有
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
              <Col span={12}>
                <FormItem
                  label='机构名称：'
                  {...formItemLayout}
                  required
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhName', {
                      initialValue: '',
                      rules: [{
                        required: true,
                        message: ' '
                      }]
                    })(
                      <Input
                        placeholder='请输入机构'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label='联系人：'
                  {...formItemLayout}
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhPerson', {
                      initialValue: ''
                    })(
                      <Input
                        placeholder='请填写联系人'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label='机构等级：'
                  {...formItemLayout}
                  required
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhLevel', {
                      rules: [{
                        required: true,
                        message: ' '
                      }]
                    })(
                      <Select
                        placeholder='请选择机构等级'
                      >
                        {setOptions}
                      </Select>
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label='联系电话：'
                  {...formItemLayout}
                  required
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhPhone', {
                      initialValue: '',
                      rules: [{
                        validator: this.phoneNumberCheck
                      }]
                    })(
                      <Input
                        placeholder='请输入联系电话'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label='机构描述：'
                  {...formItemLayout}
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhDesc', {
                      initialValue: ''
                    })(
                      <Input
                        placeholder='请填写机构描述'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label='地区编号：'
                  {...formItemLayout}
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhRegionId', {
                      initialValue: ''
                    })(
                      <Input
                        placeholder='请输入地区编号'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label='机构地址：'
                  {...formItemLayout}
                  hasFeedback
                >
                  {
                    getFieldDecorator('brhAddress', {
                      initialValue: ''
                    })(
                      <Input
                        placeholder='请填写机构地址'
                        size='large'
                      />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label='所属机构：'
                  {...formItemLayout}
                >
                  {getFieldDecorator('brhId', {
                    initialValue: ''
                  })(
                    <TreeSelect
                      placeholder='请选择所属机构'
                      {...treeProps}
                      allowClear
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Spin loading={this.state.loading} />
        </Modal>
      </div>
    )
  }
}
