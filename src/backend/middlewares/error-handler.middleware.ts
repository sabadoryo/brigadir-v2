import express, { NextFunction, Request, Response } from 'express'
import CustomHttpError from '../errors/custom-http-error'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomHttpError) {
    return res.status(err.statusCode).json({
      status: err.statusCode >= 400 ? 'error' : 'success',
      message: err.message,
    })
  }

  console.error('Unhandled error:', err)

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong, please try again later.',
  })
}

export const errorHandlerTyped =
  errorHandler as unknown as express.RequestHandler
