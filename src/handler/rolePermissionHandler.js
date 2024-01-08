import BaseHandler from './baseHandler.js'

class RolePermissionHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('rolePermission')
  }

  init (server) {
    server.add('services.collection.RolePermissionDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new RolePermissionHandler()
