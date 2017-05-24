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
import PostManage from '../PostManage/sync'
import ReviewSettings from '../ReviewSettings/sync'
import StrategySettings from '../StrategySettings/sync'
import CheckList from '../CheckList/sync'
import CheckHistoryList from '../CheckHistoryList/sync'
import ApplyHistoryList from '../ApplyHistoryList/sync'
import UpgradeManage from '../UpgradeManage/sync'

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
              <Route path='/home/branchList' component={BranchManage} />
              <Route path='/home/User' component={UserManage} />
              <Route path='/home/Role' component={RoleManage} />
              <Route path='/home/postList' component={PostManage} />
              <Route path='/home/relationList' component={ReviewSettings} />
              <Route path='/home/relationSet' component={StrategySettings} />
              <Route path='/home/checkList' component={CheckList} />
              <Route path='/home/checkHistoryList' component={CheckHistoryList} />
              <Route path='/home/pendHistoryList' component={ApplyHistoryList} />
              <Route path='/home/upgradeManage' component={UpgradeManage} />
              <Route component={Welcome} />
            </Switch>
          </div>
        </div>
      </div>
    )

    return this.state.loaded ? view : <Loading />
  }
}
