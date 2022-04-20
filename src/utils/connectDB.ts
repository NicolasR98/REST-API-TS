import { connect } from 'mongoose'
import config from 'config'
import logger from './logger'

const connectDB = async (): Promise<void> => {
  const dbUri = config.get<string>('dbUri')

  try {
    await connect(dbUri)
    logger.info('Connected to the db!')
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default connectDB
