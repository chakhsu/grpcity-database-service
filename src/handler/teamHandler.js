import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class TeamHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('team')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.TeamDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new TeamHandler()
