import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB'
import logger from './utils/logger'
import routes from './utils/routes'

const port = config.get<number>('port')

const app = express()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(port, async () => {
  logger.info(`Server started at http://localhost:${port}`)
  await connectDB()
  routes(app)
})
