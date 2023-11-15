import BaseHandler from './baseHandler.js'

class ProjectHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('project')
  }

  init (server) {
    server.addService('services.collection.ProjectDB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new ProjectHandler()
