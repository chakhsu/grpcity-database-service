import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class message extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('message', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(60),
        allowNull: false,
        comment: '标题'
      },
      content: {
        type: DataTypes.STRING(256),
        allowNull: true,
        comment: '内容'
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
        comment: '是否已读',
        field: 'is_read'
      },
      oplogId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '操作日志id',
        field: 'oplog_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '这条消息属于哪个用户的，用户id',
        field: 'user_id'
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
      tableName: 'message',
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
