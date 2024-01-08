import error from './error.js'
import rpcLog from './rpcLog.js'

class Middleware {
  init (server) {
    server.use(error.middleware)
    server.use(rpcLog.middleware)
  }
}

export default new Middleware()
