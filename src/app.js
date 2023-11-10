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

    await this.startGrpcServer()
  }

  async initMysql () {
    const { database, username, password, detailOptions } = this._options.mysql
    mysql.init({ database, username, password, detailOptions })
    logger.info({ database }, 'mysql.init finish.')
  }

  async initGrpc () {
    const { isDev, packagePrefix, services } = this._options.grpc
    await grpc.init({ services, isDev, packagePrefix })
    logger.info({ packagePrefix }, 'grpc.init finish.')
  }

  async startGrpcServer () {
    const { host, port } = this._options.grpc

    const server = grpc.initServer()

    middleware.init(server)
    handler.init(server)

    await server.listen({ host, port })
    logger.info(`grpc server is started at ${host}:${port}`)
  }
}

export default new App()
