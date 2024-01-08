import fs from 'node:fs'
import Promise from 'bluebird'
import path from 'node:path'
import _ from 'lodash-es'

import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const genHandlerTemplate = (name) => {
  return `import BaseHandler from './baseHandler.js'

class ${_.upperFirst(name)}Handler extends BaseHandler {
  // eslint-disable-next-line
  constructor () {
    super('${name}')
  }

  init (server) {
    server.add('services.collection.${_.upperFirst(name)}DB', this, { exclude: ['init'], inherit: BaseHandler })
  }
}

export default new ${_.upperFirst(name)}Handler()
`
}

;(async () => {
  // 读取全部sql文件
  const files = fs.readdirSync(path.join(__dirname, './sql/'))
  // 指定sql文件
  // const files = [
  //   'user.sql',
  // ]

  const fileNames = files.map(fileName => _.camelCase(fileName.replace('.sql', '')))

  const protoDict = '../src/handler'

  let initImportData = ''
  let initClassData = 'class Handler {\n  init (server) {\n'

  await Promise.map(fileNames, async (fileName) => {
    initImportData += `import ${fileName}Handler from './${fileName}Handler.js'\n`
    initClassData += `    ${fileName}Handler.init(server)\n`

    const handlerPath = path.join(__dirname, `${protoDict}/${fileName}Handler.js`)
    const handlerData = genHandlerTemplate(fileName)
    fs.writeFileSync(handlerPath, handlerData)
    console.log(`Handler file "${fileName}" has been written to "${handlerPath}"`)
  }, { concurrency: 1 })

  initClassData += `  }
}

export default new Handler()\n`

  const initData = initImportData + '\n' + initClassData
  const initPath = path.join(__dirname, `${protoDict}/init.js`)

  fs.writeFileSync(initPath, initData)
  console.log(`init file has been written to "${initPath}"`)

  console.log('finished!')
  process.exit()
})()
