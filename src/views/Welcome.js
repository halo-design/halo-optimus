import React from 'react'
import { connect } from 'react-redux'
import 'STYLE/pages/welcome.scss'

@connect(
  state => ({
    main: state.public.main
  })
)

export default class WelcomeView extends React.Component {

  render () {
    const { main } = this.props
    const format = str => str || '暂无'
    return (
      <div className='page-welcome'>
        <div className='title'>欢迎使用IFP内部管理系统！</div>
        <div className='table'>
          <table>
            <tbody>
              {
                [{
                  label: '当前访问IP：',
                  info: format(main.currentCstIP)
                }, {
                  label: '当前访问时间：',
                  info: format(main.currentLoginTime)
                }, {
                  label: '最后一次访问IP：',
                  info: format(main.lastCstIP)
                }, {
                  label: '最后一次登录时间：',
                  info: format(main.lastLoginTime)
                }, {
                  label: '当前登录次数：',
                  info: format(main.loginCount)
                }].map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className='label'>{item.label}</td>
                      <td>{item.info}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
