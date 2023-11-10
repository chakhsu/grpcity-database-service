import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class UserHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('user')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.UserDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new UserHandler()
