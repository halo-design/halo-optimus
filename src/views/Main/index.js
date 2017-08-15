import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createRoutes from 'UTIL/createRoutes'
import { initUserForm } from 'REDUCER/public/main'
import { initUserMenu } from 'REDUCER/public/menu'
import Loading from 'COMPONENT/effects/Loading'
import BufferCompnent from 'COMPONENT/effects/Buffer'
import Header from './Header'
import Welcome from '../Welcome'
import BranchManage from 'bundle-loader?lazy&name=branchManage!../BranchManage'
import UserManage from 'bundle-loader?lazy&name=userManage!../UserManage'
import RoleManage from 'bundle-loader?lazy&name=roleManage!../RoleManage'
import PostManage from 'bundle-loader?lazy&name=postManage!../PostManage'
import ReviewSettings from 'bundle-loader?lazy&name=reviewSettings!../ReviewSettings'
import StrategySettings from 'bundle-loader?lazy&name=strategySettings!../StrategySettings'
import CheckList from 'bundle-loader?lazy&name=checkList!../CheckList'
import CheckHistoryList from 'bundle-loader?lazy&name=checkHistoryList!../CheckHistoryList'
import ApplyHistoryList from 'bundle-loader?lazy&name=applyHistoryList!../ApplyHistoryList'
import UpgradeManage from 'bundle-loader?lazy&name=upgradeManage!../UpgradeManage'
import HotpatchManage from 'bundle-loader?lazy&name=hotpatchManage!../HotpatchManage'
import WhiteListManage from 'bundle-loader?lazy&name=whiteListManage!../WhiteListManage'
import ResourceManage from 'bundle-loader?lazy&name=resourceManage!../ResourceManage'

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
    const compRender = model => () => <BufferCompnent compnent={model} />
    const view = (
      <div className='app-main'>
        <Header />
        <div className='app-content'>
          <div className='app-page-wrapper'>
            {
              createRoutes('/home', [{
                path: '/branchList',
                component: compRender(BranchManage)
              }, {
                path: '/User',
                component: compRender(UserManage)
              }, {
                path: '/Role',
                component: compRender(RoleManage)
              }, {
                path: '/postList',
                component: compRender(PostManage)
              }, {
                path: '/relationList',
                component: compRender(ReviewSettings)
              }, {
                path: '/relationSet',
                component: compRender(StrategySettings)
              }, {
                path: '/checkList',
                component: compRender(CheckList)
              }, {
                path: '/checkHistoryList',
                component: compRender(CheckHistoryList)
              }, {
                path: '/pendHistoryList',
                component: compRender(ApplyHistoryList)
              }, {
                path: '/upgradeManage',
                component: compRender(UpgradeManage)
              }, {
                path: '/hotpatchManage',
                component: compRender(HotpatchManage)
              }, {
                path: '/whiteListManage',
                component: compRender(WhiteListManage)
              }, {
                path: '/resourceManage',
                component: compRender(ResourceManage)
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
