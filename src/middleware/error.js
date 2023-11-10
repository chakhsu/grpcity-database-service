import logger from '../lib/logger.js'

class Error {
  async middleware (ctx, next) {
    try {
      await next()
    } catch (err) {
      logger.error({ err, ctx }, 'error middleware listen')

      // catch error and return empty response
      ctx.response = {}
    }
  }
}

export default new Error()
