export default {
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  },
  grpc: {
    host: '0.0.0.0',
    port: 10051
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
