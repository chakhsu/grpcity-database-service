import BaseHandler from './baseHandler.js'

class MessageHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('message')
  }

  init (server) {
    server.addService('services.collection.MessageDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new MessageHandler()
