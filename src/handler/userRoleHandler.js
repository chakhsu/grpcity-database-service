import BaseHandler from './baseHandler.js'

class UserRoleHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('userRole')
  }

  init (server) {
    server.addService('services.collection.UserRoleDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new UserRoleHandler()
