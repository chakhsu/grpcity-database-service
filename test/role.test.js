import test from 'ava'
import grpc from '../src/lib/grpc.js'
import Config from '../src/config/index.js'

test.serial('role e2e test', async t => {
  const config = Config.get()
  config.logger.level = 'warn'
  await grpc.init()
  const clients = await grpc.initClients({ services: config.grpc.services })
  t.timeout(3 * 1000)

  const role = {
    roleCode: 'nYm8u',
    roleName: '8oFjL',
    description: 'uMrEE',
    lastReviser: 'ZFDWu',
    appName: 'db-service-1'
  }

  const roles = []
  for (let i = 0; i < 3; i++) {
    roles.push({
      roleCode: 'nYm8u',
      roleName: '8oFjL',
      description: 'uMrEE',
      lastReviser: 'ZFDWu',
      appName: 'db-service-1'
    })
  }

  const searchOptions = {
    filter: {
      and: {
        term: [{
          key: 'appName',
          stringLike: 'db%'
        }]
      }
    },
    order: {
      field: 'updateTime',
      sort: 'ASC'
    },
    pagination: {
      limit: 20,
      offset: 0
    }
  }

  const updateByIdOptions = {
    appName: 'db-service-3'
  }

  const updateOptions = {
    role: {
      appName: 'db-service-2'
    },
    filter: {
      term: [
        {
          key: 'appName',
          stringValue: ['db-service-1']
        }
      ]
    }
  }

  const roleDB = clients.get('services.collection.RoleDB')
  const result = await roleDB.createOne({ role })
  t.assert(result.response.id)
  t.log(result)

  t.log('-------------------------')

  const result1 = await roleDB.bulkCreate({ role: roles })
  t.assert(result1.response.id.length > 0)
  t.log(result1)

  t.log('-------------------------')

  const allIds = [result.response.id, ...result1.response.id]
  t.log(allIds)

  t.log('-------------------------')

  const result2 = await roleDB.searchById({ id: allIds[0] })
  t.assert(result2.response.role)
  t.log(result2)

  t.log('-------------------------')

  const result3 = await roleDB.search(searchOptions)
  t.assert(result3.response.list)
  t.log(result3)

  t.log('-------------------------')

  const result4 = await roleDB.updateById({
    id: allIds[allIds.length - 1],
    role: updateByIdOptions
  })

  t.assert(result4.response.affectedRowCount >= 0)
  t.log(result4)

  t.log('-------------------------')

  const result5 = await roleDB.update(updateOptions)

  t.assert(result5.response.affectedRowCount >= 0)
  t.log(result5)

  t.log('-------------------------')

  const result6 = await roleDB.deleteById({ id: allIds[0] })

  t.assert(result6.response.affectedRowCount >= 0)
  t.log(result6)

  t.log('-------------------------')

  const result7 = await roleDB.delete({
    filter: {
      term: [
        {
          key: 'id',
          numberValue: allIds
        }
      ]
    }
  })

  t.assert(result7.response.affectedRowCount >= 0)
  t.log(result7)
})
