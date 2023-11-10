import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class rolePermission extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('rolePermission', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '角色id',
        field: 'role_id'
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '权限id',
        field: 'permission_id'
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间',
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '更新时间',
        field: 'update_time'
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '逻辑删除',
        field: 'is_delete'
      },
      appName: {
        type: DataTypes.STRING(16),
        allowNull: true,
        comment: '应用名称',
        field: 'app_name'
      }
    }, {
      tableName: 'role_permission',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    })
  }
}
