import BaseHandler from './baseHandler.js'

class UserProjectHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('userProject')
  }

  init (server) {
    server.add('services.collection.UserProjectDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new UserProjectHandler()
