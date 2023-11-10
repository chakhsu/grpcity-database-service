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

test.serial('oplog e2e test', async t => {
  const oplog = {
    operatorIp: 'l2IvR',
    operator: 'lWVGt',
    operatePage: 'PB36x',
    operateType: 'K0rM7',
    targetType: 'pWQ0y',
    target: 'AU4cZ',
    operationMethods: '6BNHm',
    detail: 'mBUY6',
    appName: 'db-service-1'
  }

  const oplogs = []
  for (let i = 0; i < 3; i++) {
    oplogs.push({
      operatorIp: 'l2IvR',
      operator: 'lWVGt',
      operatePage: 'PB36x',
      operateType: 'K0rM7',
      targetType: 'pWQ0y',
      target: 'AU4cZ',
      operationMethods: '6BNHm',
      detail: 'mBUY6',
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
    oplog: {
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

  const oplogDB = grpc.client('services.collection.OplogDB')
  const result = await oplogDB.createOne({ oplog })
  t.assert(result.response.id)
  t.log(result)

  t.log('-------------------------')

  const result1 = await oplogDB.bulkCreate({ oplog: oplogs })
  t.assert(result1.response.id.length > 0)
  t.log(result1)

  t.log('-------------------------')

  const allIds = [result.response.id, ...result1.response.id]
  t.log(allIds)

  t.log('-------------------------')

  const result2 = await oplogDB.searchById({ id: allIds[0] })
  t.assert(result2.response.oplog)
  t.log(result2)

  t.log('-------------------------')

  const result3 = await oplogDB.search(searchOptions)
  t.assert(result3.response.list)
  t.log(result3)

  t.log('-------------------------')

  const result4 = await oplogDB.updateById({
    id: allIds[allIds.length - 1],
    oplog: updateByIdOptions
  })

  t.assert(result4.response.affectedRowCount >= 0)
  t.log(result4)

  t.log('-------------------------')

  const result5 = await oplogDB.update(updateOptions)

  t.assert(result5.response.affectedRowCount >= 0)
  t.log(result5)

  t.log('-------------------------')

  const result6 = await oplogDB.deleteById({ id: allIds[0] })

  t.assert(result6.response.affectedRowCount >= 0)
  t.log(result6)

  t.log('-------------------------')

  const result7 = await oplogDB.delete({
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
