const isProd = process.env.NODE_ENV === 'production'

const rootPath = 'halo'
const serverRootPath = 'inmanage'

export const routeRootPath = isProd ? `/${rootPath}` : rootPath === serverRootPath ? '/' : rootPath

export const errorCodeCheck = errorCode => {
  // 数据校验失败返回登录页
  if (errorCode === 'BLEC0001' || errorCode === 'SYEC0002') {
    window.location.replace('/' + routeRootPath)
  }
}

export default {
  rootPath,
  serverRootPath
}
