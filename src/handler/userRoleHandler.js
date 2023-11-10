import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class UserRoleHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('userRole')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.UserRoleDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new UserRoleHandler()
