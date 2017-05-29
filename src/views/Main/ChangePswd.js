import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import handleChange from 'UTIL/handleChange'
import md5 from 'md5'
import { message } from 'antd'
import { setPasswordVisible } from 'REDUCER/public/main'
import { changePassword } from 'REDUCER/public/password'

@connect(
  null,
  dispatch => bindActionCreators({ setPasswordVisible, changePassword }, dispatch)
)

export default class ChangePswdView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      oldPswd: '',
      newPswd: '',
      newAgainPswd: ''
    }
    this.handleChange = handleChange.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onClose () {
    this.props.setPasswordVisible(false)
  }

  onSubmit () {
    const { oldPswd, newPswd, newAgainPswd } = this.state
    const pswdReg = new RegExp(/^[a-zA-Z0-9]{6,10}$/)
    if (oldPswd === '') {
      message.error('请输入旧密码！')
    } else if (newPswd === '' || !pswdReg.test(newPswd)) {
      message.error('请输入正确的新密码！')
    } else if (newAgainPswd === '' || !pswdReg.test(newAgainPswd)) {
      message.error('请再次输入正确的新密码！')
    } else if (oldPswd === newPswd) {
      message.error('新密码不能和旧密码相同!')
    } else if (newPswd !== newAgainPswd) {
      message.error('请确认两次输入的新密码一致!')
    } else {
      const data = {
        oldPassword: md5(oldPswd),
        newPassword: md5(newPswd)
      }
      this.onClose()
      this.props.changePassword(data, this.onClose)
    }
  }

  render () {
    const { oldPswd, newPswd, newAgainPswd } = this.state
    return (
      <div
        className='app-modal-box-mask'
        onClick={e => { e.target.className === 'app-modal-box-mask' && this.onClose() }}
      >
        <div className='app-modal-box'>
          <div className='title'>修改密码</div>
          <div className='content'>
            <div className='app-form-item'>
              <div className='label req'>请输入旧密码：</div>
              <div className='app-input'>
                <input
                  type='password'
                  value={oldPswd}
                  name='oldPswd'
                  placeholder='密码为6-16位数字或字母'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='app-form-item'>
              <div className='label req'>请输入新密码：</div>
              <div className='app-input'>
                <input
                  type='password'
                  value={newPswd}
                  name='newPswd'
                  placeholder='密码为6-16位数字或字母'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='app-form-item'>
              <div className='label req'>请再次输入新密码：</div>
              <div className='app-input'>
                <input
                  type='password'
                  value={newAgainPswd}
                  name='newAgainPswd'
                  placeholder='密码为6-16位数字或字母'
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className='app-double-btn'>
            <button className='app-btn hollow' onClick={e => this.onClose(e)}>返回</button>
            <button className='app-btn' onClick={e => this.onSubmit(e)}>保存</button>
          </div>
          <i className='close' onClick={e => this.onClose(e)} />
        </div>
      </div>
    )
  }
}
