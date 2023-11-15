import BaseHandler from './baseHandler.js'

class RoleHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('role')
  }

  init (server) {
    server.addService('services.collection.RoleDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new RoleHandler()
