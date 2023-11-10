export default {
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'hostname',
        translateTime: 'SYS:standard'
      }
    },
    level: process.env.LOG_LEVEL || 'debug'
  },
  grpc: {
    host: '0.0.0.0',
    port: 10051,
    services: {
      // all for e2e test
      'services.collection.UserDB': '0.0.0.0:10051',
      'services.collection.UserRoleDB': '0.0.0.0:10051',
      'services.collection.RoleDB': '0.0.0.0:10051',
      'services.collection.PermissionDB': '0.0.0.0:10051',
      'services.collection.RolePermissionDB': '0.0.0.0:10051',
      'services.collection.ProjectDB': '0.0.0.0:10051',
      'services.collection.UserProjectDB': '0.0.0.0:10051',
      'services.collection.TeamDB': '0.0.0.0:10051',
      'services.collection.MessageDB': '0.0.0.0:10051',
      'services.collection.OplogDB': '0.0.0.0:10051'
    }
  },
  mysql: {
    database: 'cooperation',
    username: 'root',
    password: 'root',
    detailOptions: [
      {
        dialect: 'mysql',
        host: 'localhost',
        port: 8889,
        charset: 'utf8mb4',
        timezone: '+08:00',
        logging: false,
        dateStrings: true,
        pool: {
          max: 20,
          acquire: 60000,
          idle: 10000
        },
        query: {
          raw: true,
          nest: true
        }
      }
    ]
  }
}
