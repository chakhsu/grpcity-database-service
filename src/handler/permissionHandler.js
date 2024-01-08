import BaseHandler from './baseHandler.js'

class PermissionHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('permission')
  }

  init (server) {
    server.add('services.collection.PermissionDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new PermissionHandler()
