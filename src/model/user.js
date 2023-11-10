import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class user extends Model {
  static init (sequelize, DataTypes) {
    return sequelize.define('user', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '用户账号',
        field: 'user_name'
      },
      pw: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        comment: '用户密码'
      },
      salt: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        defaultValue: '',
        comment: '密码盐'
      },
      realName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: '',
        comment: '真实姓名',
        field: 'real_name'
      },
      phone: {
        type: DataTypes.CHAR(20),
        allowNull: false,
        defaultValue: '',
        comment: 'mobile'
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: 'email'
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '所属团队id',
        field: 'team_id'
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '逻辑删除',
        field: 'is_delete'
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '注册时间',
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '更新时间',
        field: 'update_time'
      },
      appName: {
        type: DataTypes.STRING(16),
        allowNull: true,
        comment: '应用名称',
        field: 'app_name'
      }
    }, {
      tableName: 'user',
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
