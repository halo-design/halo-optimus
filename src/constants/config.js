const isProd = process.env.NODE_ENV === 'production'

const settings = {
  rootPath: 'inmanage'
}

export const rootPath = isProd ? `/${settings.rootPath}` : '/'
export default settings
