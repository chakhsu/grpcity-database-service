import assert from 'assert'
import { Sequelize } from 'sequelize'
import initModels from '../model/init-models.js'

class MySQL {
  constructor () {
    this.dbInstances = []
    this.cycle = 0
  }

  init ({ database, username, password, detailOptions } = {}) {
    assert((database && username && password && detailOptions), 'mysql init params lack')
    detailOptions.forEach(options => {
      const sequelize = new Sequelize(database, username, password, options)
      this.dbInstances.push(initModels(sequelize))
    })
  }

  getInstance (modelName) {
    assert(this.dbInstances.length > 0, 'mysql instance not found, need to init first')

    if (this.dbInstances.length > 1) {
      this.cycle = (this.cycle < 10000) ? (this.cycle + 1) % this.dbInstances.length : 0
    } else if (this.dbInstances.length === 1) {
      this.cycle = 0
    }

    assert(this.dbInstances[this.cycle][modelName], `mysql instance not found this model: ${modelName}`)
    return this.dbInstances[this.cycle][modelName]
  }
}

export default new MySQL()
