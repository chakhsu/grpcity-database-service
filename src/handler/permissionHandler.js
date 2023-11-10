import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class PermissionHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('permission')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.PermissionDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new PermissionHandler()
