import BaseHandler from './baseHandler.js'

class UserHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('user')
  }

  init (server) {
    server.add('services.collection.UserDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new UserHandler()
