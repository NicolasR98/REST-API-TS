/**
 * When get a request, validate schema
 */

import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

/**
 * Curry function to execute a function with the schema and after, execute
 * another function with express
 */
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })
  } catch (err: any) {
    return res.status(400).send(err.errors)
  }
}

export default validate
