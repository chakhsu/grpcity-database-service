import BaseHandler from './baseHandler.js'

class TeamHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('team')
  }

  init (server) {
    server.addService('services.collection.TeamDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new TeamHandler()
