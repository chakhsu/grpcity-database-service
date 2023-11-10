import pino from 'pino'
import Config from '../config/index.js'

const errSerializer = (e) => {
  const errJson = {
    type: e.constructor.name,
    message: e.message,
    stack: e.stack.toString()
      .split('\n')
      .filter(line => /err/i.test(line) || (!/esm\.js:/.test(line) && /\d/.test(line)))
      .slice(0, 10)
      .join('\n')
  }

  if (e.sqlMessage) errJson.sqlMessage = e.sqlMessage
  if (e.errno) errJson.errno = e.errno
  if (e.code) errJson.code = e.code
  if (e.meta) errJson.meta = e.meta

  return errJson
}

const logger = pino({
  serializers: { err: errSerializer },
  ...Config.getLoggerConfig()
})

export default logger
