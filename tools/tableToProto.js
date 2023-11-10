import fs from 'node:fs'
import Promise from 'bluebird'
import path from 'node:path'
import _ from 'lodash-es'

import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const convertSqlToModelProto = (sql, importString) => {
  const regex = /CREATE TABLE IF NOT EXISTS `(\w+)` \(([\s\S]+)\) ENGINE/
  const matches = sql.match(regex)

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid SQL syntax')
  }

  const tableName = matches[1]
  const fieldDefinitions = matches[2].trim().split('\n')

  let messageDefinition = 'syntax = "proto3";\n\n'

  messageDefinition += `${importString}\n\n`

  messageDefinition += `message ${_.upperFirst(_.camelCase((tableName)))} {\n`

  fieldDefinitions.forEach((fieldDefinition, index) => {
    const fieldMatch = fieldDefinition.match(/^\s*([\w_]+)\s+([\w\s()]+)(?:\s+default\s+([^,\n]+))?\s+([^,\n]+)\s*.*$/)
    if (!fieldMatch || fieldMatch.length !== 5) {
      throw new Error('Invalid field definition: ' + fieldDefinition)
    }

    const fieldName = fieldMatch[1]
    const fieldType = fieldMatch[2].trim().toLowerCase()
    const protoType = getProtoType(fieldType)

    messageDefinition += `  ${protoType} ${_.camelCase(fieldName)} = ${index + 1};\n`
  })

  messageDefinition += '}'

  return { fileName: _.upperFirst(_.camelCase((tableName))), data: messageDefinition }
}

const getProtoType = (fieldType) => {
  if (fieldType.startsWith('int')) {
    return 'int32'
  } else if (fieldType.startsWith('varchar') || fieldType.startsWith('char')) {
    return 'string'
  } else if (fieldType.startsWith('tinyint')) {
    return 'bool'
  } else if (fieldType.startsWith('timestamp')) {
    return 'string'
  }

  // 默认为string类型
  return 'string'
}

const genDBProtoTemplate = (name) => {
  return `syntax = "proto3";

package services.collection;

import "services/common/Filter.proto";
import "services/common/Request.proto";
import "services/common/Response.proto";

import "services/model/${name}.proto";

service ${name}DB {
  rpc CreateOne(CreateOne${name}Request)
      returns (services.common.IdResponse) {}
  rpc BulkCreate(BulkCreate${name}Request)
      returns (services.common.RepeatedIdResponses) {}

  rpc SearchById(services.common.IdRequest)
      returns (SearchById${name}Response) {}
  rpc Search(services.common.SearchRequest)
      returns (Search${name}Response) {}

  rpc UpdateById(UpdateById${name}Request)
      returns (services.common.AffectedRowCountResponse) {}
  rpc Update(Update${name}Request)
      returns (services.common.AffectedRowCountResponse) {}

  rpc DeleteById(services.common.IdRequest)
      returns (services.common.AffectedRowCountResponse) {}
  rpc Delete(services.common.FilterRequest)
      returns (services.common.AffectedRowCountResponse) {}
}

message CreateOne${name}Request {
  services.model.${name} ${_.lowerFirst(name)} = 1;
}

message BulkCreate${name}Request {
  repeated services.model.${name} ${_.lowerFirst(name)} = 1;
}

message SearchById${name}Response {
  services.model.${name} ${_.lowerFirst(name)} = 1;
}

message Search${name}Response {
  int32 total = 1;
  repeated services.model.${name} list = 2;
}

message UpdateById${name}Request {
  string id = 1;
  services.model.${name} ${_.lowerFirst(name)} = 2;
}

message Update${name}Request {
  services.model.${name} ${_.lowerFirst(name)} = 1;
  services.common.Filter filter = 2;
}
`
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
      filename,
      data: fs.readFileSync(path.join(__dirname, `./sql/${filename}`)).toString()
    }
  })

  const protoDict = '../protos/services'

  await Promise.map(sqls, async (sql) => {
    const importString = 'package services.model;'
    const { fileName, data } = convertSqlToModelProto(sql.data, importString)
    const protoPath = path.join(__dirname, `${protoDict}/model/${fileName}.proto`)
    fs.writeFileSync(protoPath, data)
    console.log(`Proto file "${fileName}" has been written to "${protoPath}"`)

    const DBProtoPath = path.join(__dirname, `${protoDict}/collection/${fileName}DB.proto`)
    const DBProtoData = genDBProtoTemplate(fileName)
    fs.writeFileSync(DBProtoPath, DBProtoData)
    console.log(`DB Proto file "${fileName}" has been written to "${DBProtoPath}"`)
  }, { concurrency: 1 })

  console.log('finished!')
  process.exit()
})()
