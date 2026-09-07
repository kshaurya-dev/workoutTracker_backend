const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})