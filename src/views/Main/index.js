import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createRoutes from 'UTIL/createRoutes'
import { initUserForm } from 'REDUCER/public/main'
import { initUserMenu } from 'REDUCER/public/menu'
import Loading from 'COMPONENT/effects/Loading'
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
import HotpatchManage from '../HotpatchManage/sync'
import WhiteListManage from '../WhiteListManage/sync'
import ResourceManage from '../ResourceManage/sync'

@connect(
  null,
  dispatch => bindActionCreators({ initUserForm, initUserMenu }, dispatch)
)

export default class MainView extends React.Component {
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
            {
              createRoutes('/home', [{
                path: '/branchList',
                component: BranchManage
              }, {
                path: '/User',
                component: UserManage
              }, {
                path: '/Role',
                component: RoleManage
              }, {
                path: '/postList',
                component: PostManage
              }, {
                path: '/relationList',
                component: ReviewSettings
              }, {
                path: '/relationSet',
                component: StrategySettings
              }, {
                path: '/checkList',
                component: CheckList
              }, {
                path: '/checkHistoryList',
                component: CheckHistoryList
              }, {
                path: '/pendHistoryList',
                component: ApplyHistoryList
              }, {
                path: '/upgradeManage',
                component: UpgradeManage
              }, {
                path: '/hotpatchManage',
                component: HotpatchManage
              }, {
                path: '/whiteListManage',
                component: WhiteListManage
              }, {
                path: '/resourceManage',
                component: ResourceManage
              }, {
                component: Welcome
              }])
            }
          </div>
        </div>
      </div>
    )

    return this.state.loaded ? view : <Loading />
  }
}
