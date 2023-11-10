import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class oplog extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('oplog', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      operatorIp: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '操作者ip',
        field: 'operator_ip'
      },
      operator: {
        type: DataTypes.STRING(64),
        allowNull: true,
        comment: '操作者账号'
      },
      operatePage: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        comment: '操作页面',
        field: 'operate_page'
      },
      operateType: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '操作类型',
        field: 'operate_type'
      },
      targetType: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '对象分类',
        field: 'target_type'
      },
      target: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: '操作对象'
      },
      operationMethods: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        comment: '操作方式',
        field: 'operation_methods'
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '日志详情'
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
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
      tableName: 'oplog',
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
