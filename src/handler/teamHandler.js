import BaseHandler from './baseHandler.js'

class TeamHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('team')
  }

  init (server) {
    server.add('services.collection.TeamDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new TeamHandler()
