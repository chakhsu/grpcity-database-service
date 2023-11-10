import assert from 'assert'
import { readFileSync } from 'fs'
import development from './development.js'
import production from './production.js'
import stage from './stage.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pkgInfo = JSON.parse(readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'))

const allConfigs = { development, test: development, stage, production }
const env = process.env.NODE_ENV || 'development'

assert(allConfigs[env], `No Match config for env: ${env}, only allow [ test, development, stage, production ]`)

const activeConfig = Object.assign({
  pkgInfo: {
    name: pkgInfo.name,
    version: pkgInfo.version,
    description: pkgInfo.description
  }
}, allConfigs[env])

export default class Config {
  static get () {
    if (Config.called) {
      throw new Error('Only allow the use of "config" within app.js, as it may make it difficult to write test code.')
    } else {
      Config.called = true
      return activeConfig
    }
  }

  static getLoggerConfig () {
    return activeConfig.logger
  }
}
