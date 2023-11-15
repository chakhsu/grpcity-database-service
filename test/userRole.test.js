import test from 'ava'
import grpc from '../src/lib/grpc.js'
import Config from '../src/config/index.js'

test.before(async t => {
  const config = Config.get()
  config.logger.level = 'warn'
  await grpc.init()
  await grpc.initClients({ services: config.grpc.services })
  t.timeout(3 * 1000)
})

test.serial('userRole e2e test', async t => {
  const userRole = {
    userId: 8,
    roleId: 2,
    appName: 'db-service-1'
  }

  const userRoles = []
  for (let i = 0; i < 3; i++) {
    userRoles.push({
      userId: 8,
      roleId: 2,
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
    userRole: {
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

  const userRoleDB = grpc.client('services.collection.UserRoleDB')
  const result = await userRoleDB.createOne({ userRole })
  t.assert(result.response.id)
  t.log(result)

  t.log('-------------------------')

  const result1 = await userRoleDB.bulkCreate({ userRole: userRoles })
  t.assert(result1.response.id.length > 0)
  t.log(result1)

  t.log('-------------------------')

  const allIds = [result.response.id, ...result1.response.id]
  t.log(allIds)

  t.log('-------------------------')

  const result2 = await userRoleDB.searchById({ id: allIds[0] })
  t.assert(result2.response.userRole)
  t.log(result2)

  t.log('-------------------------')

  const result3 = await userRoleDB.search(searchOptions)
  t.assert(result3.response.list)
  t.log(result3)

  t.log('-------------------------')

  const result4 = await userRoleDB.updateById({
    id: allIds[allIds.length - 1],
    userRole: updateByIdOptions
  })

  t.assert(result4.response.affectedRowCount >= 0)
  t.log(result4)

  t.log('-------------------------')

  const result5 = await userRoleDB.update(updateOptions)

  t.assert(result5.response.affectedRowCount >= 0)
  t.log(result5)

  t.log('-------------------------')

  const result6 = await userRoleDB.deleteById({ id: allIds[0] })

  t.assert(result6.response.affectedRowCount >= 0)
  t.log(result6)

  t.log('-------------------------')

  const result7 = await userRoleDB.delete({
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
