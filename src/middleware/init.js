import error from './error.js'
import rpcLog from './rpcLog.js'

class Middleware {
  init (server) {
    server.addMiddleware(error.middleware)
    server.addMiddleware(rpcLog.middleware)
  }
}

export default new Middleware()
