import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import NProgress from 'nprogress'
import { message } from 'antd'
import handleChange from 'UTIL/handleChange'
import * as loginAction from 'REDUCER/public/login'
import avatarImg from 'IMAGE/avatar.png'
import 'STYLE/pages/login.scss'

@connect(
  state => ({
    vcodeSrc: state.public.login.checkCodeSrc
  }),
  dispatch => bindActionCreators({ ...loginAction }, dispatch)
)

@withRouter

export default class LoginView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: 'false',
      userName: '',
      pswd: '',
      vcode: ''
    }
    this.reloadCode = this.reloadCode.bind(this)
    this.triggerSubmit = this.triggerSubmit.bind(this)
    this.handleChange = handleChange.bind(this)
  }

  reloadCode () {
    this.props.setSessionID()
  }

  handleFocus (e) {
    e.currentTarget.parentNode.classList.add('focus')
  }

  handleBlur (e) {
    e.currentTarget.parentNode.classList.remove('focus')
  }

  triggerSubmit (e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  componentWillMount () {
    this.reloadCode()
  }

  componentDidMount () {
    NProgress.done()
    window.addEventListener('keyup', this.triggerSubmit, false)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.triggerSubmit)
  }

  handleSubmit () {
    const { history, validateLogin } = this.props

    if (this.state.userName.trim() === '') {
      message.error('请输入用户名！')
    } else if (this.state.pswd.trim() === '') {
      message.error('请输入登录密码！')
    } else if (this.state.vcode.trim() === '') {
      message.error('请输入验证码！')
    } else {
      NProgress.start()
      validateLogin(this.state, () => {
        NProgress.done()
        history.push('home')
      }, () => {
        NProgress.done()
        this.setState({
          vcode: ''
        })
      })
    }
  }

  render () {
    const { userName, pswd, vcode } = this.state
    const { vcodeSrc } = this.props
    return (
      <div className='pageLogin'>
        <div className='loginBox'>
          <div className='avatar'><img alt='avatar' src={avatarImg} /></div>
          <div className='input pre-icon'>
            <i className='iconfont user' />
            <input
              placeholder='请输入用户名'
              value={userName}
              name='userName'
              onChange={this.handleChange}
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              ref={node => { this.userNameInput = node }}
            />
          </div>
          <div className='input pre-icon'>
            <i className='iconfont pswd' />
            <input
              placeholder='请输入密码'
              type='password'
              value={pswd}
              name='pswd'
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              onChange={this.handleChange}
              ref={node => { this.pswdInput = node }}
            />
          </div>
          <div className='input vcode'>
            <input
              placeholder='请输入验证码'
              value={vcode}
              name='vcode'
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              onChange={this.handleChange}
            />
            {
              vcodeSrc
                ? <img
                  src={vcodeSrc}
                  onClick={this.reloadCode}
                />
                : null
            }
          </div>
          <div className='btn-wrap'>
            <button onClick={e => this.handleSubmit()}>立即登录</button>
          </div>
          <div className='project'>FLAME移动管理系统 2.0</div>
        </div>
      </div>
    )
  }
}
