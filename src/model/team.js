import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class team extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('team', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      teamName: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '团队名',
        field: 'team_name'
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '父团队id',
        field: 'parent_id'
      },
      leaf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否叶子团队'
      },
      level: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: 'parentId为0的层级为1'
      },
      description: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '描述'
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
      tableName: 'team',
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
