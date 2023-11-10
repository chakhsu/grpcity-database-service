import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class role extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('role', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      roleCode: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '角色编号',
        field: 'role_code'
      },
      roleName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '名称',
        field: 'role_name'
      },
      description: {
        type: DataTypes.STRING(128),
        allowNull: true,
        comment: '角色描述'
      },
      lastReviser: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: '最后修改人',
        field: 'last_reviser'
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
      tableName: 'role',
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
