import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class MessageHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('message')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.MessageDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new MessageHandler()
