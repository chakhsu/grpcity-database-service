import fs from 'node:fs'
import Promise from 'bluebird'
import path from 'node:path'
import _ from 'lodash-es'

import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const genTestTemplatePartOne = (name) => {
  return `
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

test.serial('${name} e2e test', async t => {
    const ${name} = {
`
}

const genTestTemplatePartTwo = (name) => {
  return `
}

const ${name}s = []
for (let i = 0; i < 3; i++) {
    ${name}s.push({
`
}

const genTestTemplatePartThree = (name) => {
  return `
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
    ${name}: {
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

const ${name}DB = grpc.client('services.collection.${_.upperFirst(name)}DB')
const result = await ${name}DB.createOne({ ${name} })
t.assert(result.response.id)
t.log(result)

t.log('-------------------------')

const result1 = await ${name}DB.bulkCreate({ ${name}: ${name}s })
t.assert(result1.response.id.length > 0)
t.log(result1)

t.log('-------------------------')

const allIds = [result.response.id, ...result1.response.id]
t.log(allIds)

t.log('-------------------------')

const result2 = await ${name}DB.searchById({ id: allIds[0] })
t.assert(result2.response.${name})
t.log(result2)

t.log('-------------------------')

const result3 = await ${name}DB.search(searchOptions)
t.assert(result3.response.list)
t.log(result3)

t.log('-------------------------')

const result4 = await ${name}DB.updateById({
    id: allIds[allIds.length-1],
    ${name}: updateByIdOptions
})

t.assert(result4.response.affectedRowCount >= 0)
t.log(result4)

t.log('-------------------------')

const result5 = await ${name}DB.update(updateOptions)

t.assert(result5.response.affectedRowCount >= 0)
t.log(result5)

t.log('-------------------------')

const result6 = await ${name}DB.deleteById({ id: allIds[0] })

t.assert(result6.response.affectedRowCount >= 0)
t.log(result6)

t.log('-------------------------')

const result7 = await ${name}DB.delete({
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
`
}

// 生成指定长度的随机字符串
function generateRandomString (length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

// 生成指定范围的随机整数
function generateRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 根据字段类型和长度生成随机值
function generateRandomValue (dataType) {
  if (dataType.includes('int')) {
    return generateRandomInt(1, 10)
  } else if (dataType.includes('varchar') || dataType.includes('char') || dataType.includes('text')) {
    return `'${generateRandomString(5)}'`
  } else if (dataType.includes('tinyint')) {
    return !(Math.random() < 0.5)
  } else {
    return ''
  }
}

const convertSqlToKV = (sql) => {
  const regex = /CREATE TABLE IF NOT EXISTS `(\w+)` \(([\s\S]+)\) ENGINE/
  const matches = sql.match(regex)

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid SQL syntax')
  }

  const fieldDefinitions = matches[2].trim().split('\n')

  let kv = ''

  fieldDefinitions.forEach((fieldDefinition, index) => {
    const fieldMatch = fieldDefinition.match(/^\s*([\w_]+)\s+([\w\s()]+)(?:\s+default\s+([^,\n]+))?\s+([^,\n]+)\s*.*$/)
    if (!fieldMatch || fieldMatch.length !== 5) {
      throw new Error('Invalid field definition: ' + fieldDefinition)
    }

    const fieldName = _.camelCase(fieldMatch[1])
    const fieldType = fieldMatch[2].trim().toLowerCase()
    const value = generateRandomValue(fieldType)

    if (!fieldName.includes('Time') &&
      fieldName !== 'appName' &&
      fieldName !== 'isDelete' &&
      fieldName !== 'id'
    ) {
      kv += `     ${fieldName}: ${value},\n`
    }
    if (fieldName === 'appName') {
      kv += '     appName: \'db-service-1\''
    }
  })

  return kv
}

;(async () => {
  // 读取全部sql文件
  const files = fs.readdirSync(path.join(__dirname, './sql/'))
  // 指定sql文件
  // const files = [
  //   'user.sql',
  // ]

  const sqls = files.map(filename => {
    return {
      fileName: _.camelCase(filename.replace('.sql', '')),
      data: fs.readFileSync(path.join(__dirname, `./sql/${filename}`)).toString()
    }
  })

  const testDict = '../test'

  await Promise.map(sqls, async ({ fileName, data }) => {
    const testPath = path.join(__dirname, `${testDict}/${fileName}.test.js`)

    let PartOne = genTestTemplatePartOne(fileName)
    let PartTwo = genTestTemplatePartTwo(fileName)
    const PartThree = genTestTemplatePartThree(fileName)

    const randomFieldValues = convertSqlToKV(data)
    PartOne += randomFieldValues
    PartTwo += randomFieldValues
    const testData = PartOne + PartTwo + PartThree

    fs.writeFileSync(testPath, testData)

    console.log(`test file "${fileName}" has been written to "${testPath}"`)
  }, { concurrency: 1 })

  console.log('finished!')
  process.exit()
})()
