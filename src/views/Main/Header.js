import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import Account from './Account'
import Sidebar from './Sidebar'
import ChangePswd from './ChangePswd'

@withRouter

@connect(
  state => ({
    items: state.public.menu.items,
    passwordVisible: state.public.main.passwordVisible
  })
)

export default class HeaderView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentMenus: {},
      currentUrl: ''
    }
  }

  handleMenu (index) {
    let items = this.props.items[index]
    this.setState({
      currentMenus: items.menus[0],
      currentUrl: items.url
    })
  }

  componentWillMount () {
    let items = this.props.items[0]
    this.setState({
      currentMenus: items.menus[0],
      currentUrl: items.url
    })
  }

  render () {
    const LnkList = params => {
      return (
        <div className='guide'>
          {
            params.map(
              (item, i) => {
                return (
                  <NavLink
                    key={i}
                    to={'/' + item.url}
                    activeClassName='active'
                    onClick={e => this.handleMenu(i)}
                  >
                    {item.title}
                  </NavLink>
                )
              }
            )
          }
        </div>
      )
    }
    const { items, passwordVisible } = this.props
    const { currentMenus, currentUrl } = this.state
    return (
      <div className='app-header'>
        <div className='logo' />
        {LnkList(items)}
        <Sidebar
          menus={currentMenus}
          parentUrl={currentUrl}
        />
        <Account />
        <ChangePswd visible={passwordVisible} />
      </div>
    )
  }
}

