import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class RolePermissionHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('rolePermission')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.RolePermissionDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new RolePermissionHandler()
