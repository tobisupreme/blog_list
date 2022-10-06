const http = require('http')
const app = require('./app')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger').info

const server = http.createServer(app)
server.listen(PORT, () => {
  logger(`Server running on port ${PORT}`)
})
