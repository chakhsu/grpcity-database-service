import messageHandler from './messageHandler.js'
import userRoleHandler from './userRoleHandler.js'
import userProjectHandler from './userProjectHandler.js'
import userHandler from './userHandler.js'
import teamHandler from './teamHandler.js'
import rolePermissionHandler from './rolePermissionHandler.js'
import roleHandler from './roleHandler.js'
import projectHandler from './projectHandler.js'
import permissionHandler from './permissionHandler.js'
import oplogHandler from './oplogHandler.js'

class Handler {
  init (server) {
    messageHandler.init(server)
    userRoleHandler.init(server)
    userProjectHandler.init(server)
    userHandler.init(server)
    teamHandler.init(server)
    rolePermissionHandler.init(server)
    roleHandler.init(server)
    projectHandler.init(server)
    permissionHandler.init(server)
    oplogHandler.init(server)
  }
}

export default new Handler()
