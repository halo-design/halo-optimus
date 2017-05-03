import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Row, Col, Select, DatePicker } from 'antd'
import UserAddEditBox from './UserAddEditBox'
import { checkBtn } from 'UTIL/authButton'
import * as userManageAction from 'REDUCER/pages/userManage'

const { RangePicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option

@connect(
  state => {
    const { pages: { userManage }, public: { menu, config } } = state
    return {
      userMenu: menu.userMenu,
      level: config.level,
      userBox: userManage.userBox
    }
  },
  dispatch => bindActionCreators({ ...userManageAction }, dispatch)
)

@Form.create()

export default class UserQuery extends React.Component {

  constructor (props) {
    super(props)
    this.disabledEndDate = this.disabledEndDate.bind(this)
    this.disabledStartDate = this.disabledStartDate.bind(this)
  }

  disabledEndDate (endTime) {
    const beginTime = this.props.form.getFieldsValue().beginTime
    if (!endTime || !beginTime) {
      return false
    }
    return endTime.valueOf() <= beginTime.valueOf()
  }

  disabledStartDate (beginTime) {
    const endTime = this.props.form.getFieldsValue().endTime
    if (!beginTime || !endTime) {
      return false
    }
    return beginTime.valueOf() >= endTime.valueOf()
  }

  handleClear () {
    this.props.form.resetFields()
  }

  addUser () {
    this.props.setAddUserBoxVsisible(true)
  }

  searchUser () {
    const { form, userPageByBrh, updateSelectKeys } = this.props
    updateSelectKeys([])
    let filter = form.getFieldsValue()
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      } else {
        const filterTime = fieldsValue['filterTime']
        !filterTime
        ? Object.assign(filter, {
          beginTime: '',
          endTime: ''
        })
        : Object.assign(filter, {
          beginTime: filterTime[0].format('YYYYMMDD'),
          endTime: filterTime[1].format('YYYYMMDD')
        })
      }
    })
    userPageByBrh({
      currentPage: '1',
      brhId: '',
      ...filter
    })
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }

    const addUserBtn = (
      <Button
        size='large'
        type='primary'
        onClick={e => this.addUser()}
      >
        新增用户
      </Button>
    )

    const { form, level, userBox } = this.props
    const { getFieldDecorator } = form

    // 用户等级
    const userLevelList = level.map(
      item => <Option value={item.paramKey} key={item.paramKey} >{item.paramValue}</Option>
    )

    // 今日以后的未来日子不允许选择
    const disabledDate = current => current && current.valueOf() > Date.now()

    return (
      <div className='app-search-panel'>
        <Form layout='horizontal'>
          <Row>
            <Col span={11}>
              <FormItem
                label='用户编号：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userNo', {
                    initialValue: ''
                  })(
                    <Input
                      placeholder='请输入用户编号'
                      size='large'
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={13}>
              <FormItem
                label='用户名称：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userName', {
                    initialValue: ''
                  })(
                    <Input
                      placeholder='请输入用户名称'
                      size='large'
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FormItem
                label='用户级别：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userLevel', {
                    initialValue: ''
                  })(
                    <Select
                      placeholder='请选择用户级别'
                      allowClear
                    >
                      {userLevelList}
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={13}>
              <FormItem
                label='创建日期：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('filterTime', {
                    initialValue: ''
                  })(
                    <RangePicker
                      style={{ width: '100%' }}
                      format='YYYY/MM/DD'
                      disabledDate={disabledDate}
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className='button-group'>
          <Button
            size='large'
            onClick={e => this.searchUser()}
          >
            搜索用户
          </Button>
          <Button
            size='large'
            type='ghost'
            onClick={e => this.handleClear()}
          >
            清除条件
          </Button>
          {checkBtn(this.props.userMenu, 'F001', addUserBtn)}
        </div>
        {userBox.visible ? <UserAddEditBox /> : ''}
      </div>
    )
  }
}
