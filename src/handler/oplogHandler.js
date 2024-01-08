import BaseHandler from './baseHandler.js'

class OplogHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('oplog')
  }

  init (server) {
    server.add('services.collection.OplogDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new OplogHandler()
