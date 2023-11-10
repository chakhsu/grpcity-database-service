import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class permission extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('permission', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      permissionName: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '权限名字',
        field: 'permission_name'
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '父权限id',
        field: 'parent_id'
      },
      leaf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否叶子权限点（具体的操作）'
      },
      level: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '权限点的层级（parentId为0的层级为1）'
      },
      description: {
        type: DataTypes.STRING(64),
        allowNull: true,
        comment: '权限点描述'
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
        allowNull: true,
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
      tableName: 'permission',
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
