import mysql from 'mysql2/promise'
import fs from 'node:fs'
import config from './mysql.config.js'
import Promise from 'bluebird'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 读取全部sql文件
// const files = fs.readdirSync(path.join(__dirname, './sql/'))

// 指定sql文件
const files = [
  'logicalDisk.sql',
  'physicalDisk.sql',
  'relation.sql'
]

const SQLs = files.map(filename => {
  return {
    filename,
    content: fs.readFileSync(path.join(__dirname, `./sql/${filename}`)).toString()
  }
})

;(async () => {
  const poolCluster = mysql.createPoolCluster({
    removeNodeErrorCount: 1,
    canRetry: false
  })
  await poolCluster.add(config.mysql)

  const conn = await poolCluster.getConnection()

  // 执行sql文件
  await Promise.map(SQLs, async (sql) => {
    const r = await conn.query(sql.content)
    console.log(sql.filename, r)
  }, { concurrency: 1 })

  console.log('finished!')
  process.exit()
})()
