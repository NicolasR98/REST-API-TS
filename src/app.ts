import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB'
import logger from './utils/logger'

const port = config.get<number>('port')

const app = express()

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`)
  void connectDB()
})
