import BaseHandler from './baseHandler.js'

class OplogHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('oplog')
  }

  init (server) {
    server.addService('services.collection.OplogDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new OplogHandler()
