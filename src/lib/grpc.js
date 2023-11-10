import path from 'node:path'
import GrpcLoader from 'grpcity'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default new GrpcLoader({
  location: path.join(__dirname, '../../protos'),
  files: [
    'services/database-service.proto'
  ]
})
