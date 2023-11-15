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

test.serial('team e2e test', async t => {
  const team = {
    teamName: 'lCm8X',
    parentId: 8,
    leaf: 4,
    level: 9,
    description: 'REXfl',
    appName: 'db-service-1'
  }

  const teams = []
  for (let i = 0; i < 3; i++) {
    teams.push({
      teamName: 'lCm8X',
      parentId: 8,
      leaf: 4,
      level: 9,
      description: 'REXfl',
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
    team: {
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

  const teamDB = grpc.client('services.collection.TeamDB')
  const result = await teamDB.createOne({ team })
  t.assert(result.response.id)
  t.log(result)

  t.log('-------------------------')

  const result1 = await teamDB.bulkCreate({ team: teams })
  t.assert(result1.response.id.length > 0)
  t.log(result1)

  t.log('-------------------------')

  const allIds = [result.response.id, ...result1.response.id]
  t.log(allIds)

  t.log('-------------------------')

  const result2 = await teamDB.searchById({ id: allIds[0] })
  t.assert(result2.response.team)
  t.log(result2)

  t.log('-------------------------')

  const result3 = await teamDB.search(searchOptions)
  t.assert(result3.response.list)
  t.log(result3)

  t.log('-------------------------')

  const result4 = await teamDB.updateById({
    id: allIds[allIds.length - 1],
    team: updateByIdOptions
  })

  t.assert(result4.response.affectedRowCount >= 0)
  t.log(result4)

  t.log('-------------------------')

  const result5 = await teamDB.update(updateOptions)

  t.assert(result5.response.affectedRowCount >= 0)
  t.log(result5)

  t.log('-------------------------')

  const result6 = await teamDB.deleteById({ id: allIds[0] })

  t.assert(result6.response.affectedRowCount >= 0)
  t.log(result6)

  t.log('-------------------------')

  const result7 = await teamDB.delete({
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
