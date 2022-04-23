import { Express, Request, Response } from 'express'

const routes = (app: Express): void => {
  // Healthcheck
  app.get(
    '/healthcheck',
    (req: Request, res: Response) => res.sendStatus(200)
  )
}

export default routes
