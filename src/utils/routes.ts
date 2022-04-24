import { Express, Request, Response } from 'express'

import validateResource from '../middlewares/validateResource'
import { createUserSchema } from '../schema/user.schema'
import { createUserHandler } from '../controller/user.controller'

const routes = (app: Express): void => {
  // Healthcheck
  app.get(
    '/healthcheck',
    (req: Request, res: Response) => res.sendStatus(200)
  )

  // Create user
  app.post('/api/users', validateResource(createUserSchema), createUserHandler)
}

export default routes
