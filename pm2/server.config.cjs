const path = require('path')

const pkgInfo = require('../package.json')
const scriptPath = path.join(__dirname, '../bin/server.js')

module.exports = {
  apps: [{
    name: pkgInfo.name,
    script: scriptPath,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
