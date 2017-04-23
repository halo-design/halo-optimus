import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import avatarImg from 'IMAGE/avatar.png'
import { getCookie } from 'UTIL/cookie'
import { logout } from 'REDUCER/public/login'
import { setPasswordVisible } from 'REDUCER/public/main'

@connect(
  state => ({
    loginInfo: state.public.login
  }),
  dispatch => bindActionCreators({ logout, setPasswordVisible }, dispatch)
)

class Account extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showCard: false
    }
  }

  handleMouseover () {
    clearTimeout(this.avatarTimer)
    this.setState({
      showCard: true
    })
  }

  handleMouseout () {
    this.avatarTimer = setTimeout(() => {
      this.setState({
        showCard: false
      })
    }, 300)
  }

  handleLogout () {
    const Props = this.props
    Props.logout()
    Props.history.replace('/')
    Props.setPasswordVisible(false)
  }

  updatePassword () {
    this.props.setPasswordVisible(true)
  }

  render () {
    const userName = getCookie('cstName')
    return (
      <div className='app-account'>
        <div
          className='avatar-s'
          onMouseEnter={e => this.handleMouseover(e)}
          onMouseLeave={e => this.handleMouseout(e)}
        >
          <img alt='avatar' src={avatarImg} />
        </div>
        <span className='welcome'>欢迎回来，{userName}</span>
        <span className='cancel' onClick={e => this.handleLogout(e)}>退出登录</span>
        <div
          className={this.state.showCard ? 'card show' : 'card'}
          onMouseEnter={e => this.handleMouseover(e)}
          onMouseLeave={e => this.handleMouseout(e)}
        >
          <div className='up'>
            <div className='avatar-m'>
              <img alt='avatar' src={avatarImg} />
            </div>
            {userName}
          </div>
          <div className='down'>
            <div className='item' onClick={e => this.updatePassword(e)}>修改密码</div>
            <div className='item' onClick={e => this.handleLogout(e)}>退出登录</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Account)
