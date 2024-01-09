import Config from './config/index.js'
import logger from './lib/logger.js'
import grpc from './lib/grpc.js'
import mysql from './lib/mysql.js'
import middleware from './middleware/init.js'
import handler from './handler/init.js'

class App {
  async start (options) {
    this._options = options || Config.get()
    await this.initMysql()
    await this.initGrpc()

    await this.startServer()
  }

  async initMysql () {
    const { database, username, password, detailOptions } = this._options.mysql
    mysql.init({ database, username, password, detailOptions })
    logger.info('mysql.init finish.')
  }

  async initGrpc () {
    const { isDev, packagePrefix } = this._options.grpc
    await grpc.init({ isDev, packagePrefix })
    logger.info('grpc.init finish.')
  }

  async startServer () {
    const { host, port } = this._options.grpc

    const server = await grpc.initServer()

    const reflection = await grpc.initReflection()
    server.inject(reflection)

    middleware.init(server)
    handler.init(server)

    await server.listen({ host, port })
    logger.info(`gRPC Server is started at ${host}:${port}`)

    process.on('unhandledRejection', async (err, promise) => {
      logger.error('unhandledRejection', { err, promise, stack: err.stack })
      await server.shutdown()

      process.exit()
    })
  }
}

export default new App()
