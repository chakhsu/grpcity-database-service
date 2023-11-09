import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  mysql: {
    database: 'cooperation',
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    charset: 'utf8mb4'
  },
  auto: {
    dialect: 'mysql',
    host: 'localhost',
    port: 8889,
    directory: path.join(__dirname, '../src/model'),
    caseFile: 'c',
    caseModel: 'c',
    caseProp: 'c',
    lang: 'esm',
    useDefine: true,
    singularize: true
  }
}
