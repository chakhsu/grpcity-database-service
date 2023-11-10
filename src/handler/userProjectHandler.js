import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class UserProjectHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('userProject')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.UserProjectDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new UserProjectHandler()
