import logger from '../lib/logger.js'

class RpcLog {
  async middleware (ctx, next) {
    const startTime = Date.now()
    await next()
    const responseTimeMs = Date.now() - startTime

    logger.info({
      path: ctx.path,
      request: ctx.request,
      responseTimeMs
    }, 'rpc call')
  }
}

export default new RpcLog()
