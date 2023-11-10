import SequelizeAuto from 'sequelize-auto'
import config from './mysql.config.js'

const auto = new SequelizeAuto(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  config.auto)

auto.run().then(data => {
  const tableNames = Object.keys(data.tables)
  console.log(data.tables, tableNames)

  console.log('finished!')
  process.exit()
})
