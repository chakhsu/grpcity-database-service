import BaseHandler from './baseHandler.js'

class UserHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('user')
  }

  init (server) {
    server.addService('services.collection.UserDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new UserHandler()
