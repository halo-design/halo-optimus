import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, NavLink } from 'react-router-dom'
import { selectMenu } from 'REDUCER/public/menu'
import settings from 'CONSTANT/config'

@withRouter

@connect(
  null,
  dispatch => bindActionCreators({ selectMenu }, dispatch)
)

export default class SidebarView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      top: false
    }
  }

  handleActive (e) {
    const target = e.target
    const parent = target.parentNode
    const next = target.nextSibling

    if (target.getAttribute('data-state') === '0') {
      parent.classList.add('active')
      target.setAttribute('data-state', '1')
      next.style.height = next.getAttribute('data-size') + 'px'
    } else {
      parent.classList.remove('active')
      target.setAttribute('data-state', '0')
      next.style.height = 0
    }
  }

  handleActiveItem (id, title) {
    this.props.selectMenu(id)
    document.title = `${settings.projectName} - ${title}`
  }

  fixedTop (state) {
    this.setState({
      top: state
    })
  }

  componentDidMount () {
    const docEl = document.documentElement

    const scroll = () => {
      let scrollTop = docEl.scrollTop || document.body.scrollTop
      if (scrollTop > 60 && !this.state.top) {
        this.fixedTop(true)
      } else if (scrollTop <= 60 && this.state.top) {
        this.fixedTop(false)
      }
    }
    window.addEventListener('scroll', scroll, false)
  }

  render () {
    // 定义一个样式映射表
    const CSS = {
      A001B001: 'organization',
      A001B002: 'userManage',
      A001B003: 'roleManage',
      A001B004: 'postManage',
      A001B005: 'strategyManage',
      A001B006: 'reviewManage',
      A001B007: 'realTimeRelease'
    }

    const { parentUrl, menus } = this.props
    const Menu = (menus, preUrl) => (
      <div className='menu'>
        {menus.menus.map(
          (item, i) => {
            // 若只有单项
            if (item.menus.length === 0) {
              const path = '/' + preUrl + item.url.split('.')[0]
              return (
                <div className='subMenu' key={i}>
                  <div className='title single'>
                    <NavLink
                      exact={false}
                      to={path}
                      activeClassName='active'
                      onClick={e => this.handleActiveItem(item.id, item.title)}
                    >
                      <i className={`iconfont ${CSS[item.id]}`} />
                      {item.title}
                    </NavLink>
                  </div>
                </div>
              )
            } else {
              // 若有多项
              return (
                <div className='subMenu' key={i}>
                  <div className='title arr' data-state='0' onClick={e => this.handleActive(e)}>
                    <i className={`iconfont ${CSS[item.id]}`} />
                    {item.title}
                  </div>
                  <div className='menuList' data-size={item.menus.length * 42}>
                    {
                      item.menus.map(
                        (item, i) => {
                          const path = '/' + preUrl + item.url.split('.')[0]
                          return (
                            <div className='item' key={i}>
                              <NavLink
                                to={path}
                                exact={false}
                                activeClassName='active'
                                onClick={e => this.handleActiveItem(item.id, item.title)}
                              >
                                {item.title}
                              </NavLink>
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </div>
              )
            }
          }
        )}
      </div>
    )

    return (
      <div className='app-sidebar'>
        <div className='sidebar-title'><span>{menus.title}</span></div>
        <div className={this.state.top ? 'scroller-wrap fixed' : 'scroller-wrap'}>
          <div className='scroller'>
            {Menu(menus, parentUrl)}
          </div>
        </div>
      </div>
    )
  }
}
