import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class RoleHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('role')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.RoleDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new RoleHandler()
