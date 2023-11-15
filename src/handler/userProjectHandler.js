import BaseHandler from './baseHandler.js'

class UserProjectHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('userProject')
  }

  init (server) {
    server.addService('services.collection.UserProjectDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new UserProjectHandler()
