import path from 'node:path'
import { ProtoLoader } from 'grpcity'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default new ProtoLoader({
  location: path.join(__dirname, '../../protos'),
  files: [
    'services/database-service.proto'
  ]
})
