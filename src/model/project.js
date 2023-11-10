import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class project extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('project', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '项目id'
      },
      projectCode: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '项目编号',
        field: 'project_code'
      },
      projectName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '项目名',
        field: 'project_name'
      },
      description: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: '',
        comment: '项目描述'
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '团队id',
        field: 'team_id'
      },
      running: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        comment: '启用 or 停用'
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
      tableName: 'project',
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
