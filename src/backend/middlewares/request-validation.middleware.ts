import express, { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import CustomHttpError from '../errors/custom-http-error'

export const requestValidationMiddleware = (
  validationRules: ValidationChain[],
): express.RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validationRules.map((rule) => rule.run(req)))

    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorString = errors
        .array()
        .map((err) =>
          err.type == 'field'
            ? `Field '${err.path}' (value: '${err.value}') - ${err.msg}`
            : err.msg,
        )
        .join('; ')

      next(new CustomHttpError(errorString, 400))
    }

    next()
  }
}
