import grpc from '../lib/grpc.js'
import BaseHandler from './baseHandler.js'

class ProjectHandler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('project')
  }

  init (server) {
    server.addService(
      grpc.service('services.collection.ProjectDB'),
      grpc.callbackify(this, { exclude: ['init'], inherit: BaseHandler })
    )
  }
}

export default new ProjectHandler()
