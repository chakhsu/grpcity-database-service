import test from 'ava'
import grpc from '../src/lib/grpc.js'
import Config from '../src/config/index.js'

test.serial('permission e2e test', async t => {
  const config = Config.get()
  config.logger.level = 'warn'
  await grpc.init()
  const clients = await grpc.initClients({ services: config.grpc.services })
  t.timeout(3 * 1000)

  const permission = {
    permissionName: 'oN2ru',
    parentId: 3,
    leaf: 1,
    level: 4,
    description: '7PDg9',
    appName: 'db-service-1'
  }

  const permissions = []
  for (let i = 0; i < 3; i++) {
    permissions.push({
      permissionName: 'oN2ru',
      parentId: 3,
      leaf: 1,
      level: 4,
      description: '7PDg9',
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
    permission: {
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

  const permissionDB = clients.get('services.collection.PermissionDB')
  const result = await permissionDB.createOne({ permission })
  t.assert(result.response.id)
  t.log(result)

  t.log('-------------------------')

  const result1 = await permissionDB.bulkCreate({ permission: permissions })
  t.assert(result1.response.id.length > 0)
  t.log(result1)

  t.log('-------------------------')

  const allIds = [result.response.id, ...result1.response.id]
  t.log(allIds)

  t.log('-------------------------')

  const result2 = await permissionDB.searchById({ id: allIds[0] })
  t.assert(result2.response.permission)
  t.log(result2)

  t.log('-------------------------')

  const result3 = await permissionDB.search(searchOptions)
  t.assert(result3.response.list)
  t.log(result3)

  t.log('-------------------------')

  const result4 = await permissionDB.updateById({
    id: allIds[allIds.length - 1],
    permission: updateByIdOptions
  })

  t.assert(result4.response.affectedRowCount >= 0)
  t.log(result4)

  t.log('-------------------------')

  const result5 = await permissionDB.update(updateOptions)

  t.assert(result5.response.affectedRowCount >= 0)
  t.log(result5)

  t.log('-------------------------')

  const result6 = await permissionDB.deleteById({ id: allIds[0] })

  t.assert(result6.response.affectedRowCount >= 0)
  t.log(result6)

  t.log('-------------------------')

  const result7 = await permissionDB.delete({
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
