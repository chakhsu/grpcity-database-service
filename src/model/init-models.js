import _sequelize from 'sequelize'
import _message from './message.js'
import _oplog from './oplog.js'
import _permission from './permission.js'
import _project from './project.js'
import _role from './role.js'
import _rolePermission from './rolePermission.js'
import _team from './team.js'
import _user from './user.js'
import _userProject from './userProject.js'
import _userRole from './userRole.js'
const DataTypes = _sequelize.DataTypes

export default function initModels (sequelize) {
  const message = _message.init(sequelize, DataTypes)
  const oplog = _oplog.init(sequelize, DataTypes)
  const permission = _permission.init(sequelize, DataTypes)
  const project = _project.init(sequelize, DataTypes)
  const role = _role.init(sequelize, DataTypes)
  const rolePermission = _rolePermission.init(sequelize, DataTypes)
  const team = _team.init(sequelize, DataTypes)
  const user = _user.init(sequelize, DataTypes)
  const userProject = _userProject.init(sequelize, DataTypes)
  const userRole = _userRole.init(sequelize, DataTypes)

  return {
    message,
    oplog,
    permission,
    project,
    role,
    rolePermission,
    team,
    user,
    userProject,
    userRole
  }
}
