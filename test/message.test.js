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

test.serial('message e2e test', async t => {
  const message = {
    title: 'wf9Ae',
    content: 'K8lDb',
    isRead: 9,
    oplogId: 6,
    userId: 7,
    appName: 'db-service-1'
  }

  const messages = []
  for (let i = 0; i < 3; i++) {
    messages.push({
      title: 'wf9Ae',
      content: 'K8lDb',
      isRead: 9,
      oplogId: 6,
      userId: 7,
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
    message: {
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

  const messageDB = grpc.client('services.collection.MessageDB')
  const result = await messageDB.createOne({ message })
  t.assert(result.response.id)
  t.log(result)

  t.log('-------------------------')

  const result1 = await messageDB.bulkCreate({ message: messages })
  t.assert(result1.response.id.length > 0)
  t.log(result1)

  t.log('-------------------------')

  const allIds = [result.response.id, ...result1.response.id]
  t.log(allIds)

  t.log('-------------------------')

  const result2 = await messageDB.searchById({ id: allIds[0] })
  t.assert(result2.response.message)
  t.log(result2)

  t.log('-------------------------')

  const result3 = await messageDB.search(searchOptions)
  t.assert(result3.response.list)
  t.log(result3)

  t.log('-------------------------')

  const result4 = await messageDB.updateById({
    id: allIds[allIds.length - 1],
    message: updateByIdOptions
  })

  t.assert(result4.response.affectedRowCount >= 0)
  t.log(result4)

  t.log('-------------------------')

  const result5 = await messageDB.update(updateOptions)

  t.assert(result5.response.affectedRowCount >= 0)
  t.log(result5)

  t.log('-------------------------')

  const result6 = await messageDB.deleteById({ id: allIds[0] })

  t.assert(result6.response.affectedRowCount >= 0)
  t.log(result6)

  t.log('-------------------------')

  const result7 = await messageDB.delete({
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
