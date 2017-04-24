import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import { initUserForm } from 'REDUCER/public/main'
import { initUserMenu } from 'REDUCER/public/menu'
import Loading from 'COMPONENT/Loading'
import Header from './Header'
import Welcome from '../Welcome'
import BranchManage from '../BranchManage/sync'
import UserManage from '../UserManage/sync'
import RoleManage from '../RoleManage/sync'

import Counter from '../Counter'

@connect(
  null,
  dispatch => bindActionCreators({ initUserForm, initUserMenu }, dispatch)
)

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.props.initUserForm()
    this.props.initUserMenu(() => {
      this.setState({
        loaded: true
      })
    })
  }

  render () {
    const view = (
      <div className='app-main'>
        <Header />
        <div className='app-content'>
          <div className='app-page-wrapper'>
            <Switch>
              <Route exact path='/' component={Welcome} />
              <Route path='/home/branchList.html' component={BranchManage} />
              <Route path='/home/User.html' component={UserManage} />
              <Route path='/home/Role.html' component={RoleManage} />
              <Route path='/home/postList.html' component={Counter} />
              <Route component={Welcome} />
            </Switch>
          </div>
        </div>
      </div>
    )

    // 若菜单未准备好，则放弃渲染，以免报错
    return this.state.loaded ? view : (<Loading />)
  }
}
