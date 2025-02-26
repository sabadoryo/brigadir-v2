import express, { Request } from 'express'
import { PaginationQueryDto } from '../dto/pagination-query.dto'
async function sanitizePaginationQueryParamsMiddleware(
  req: Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const { page, limit } = req.query as unknown as PaginationQueryDto
  req.sanitizedQuery = {
    ...req.query,
  }

  if (req.query.page) {
    req.sanitizedQuery.page = Number(page)
  }

  if (req.query.limit) {
    req.sanitizedQuery.limit = Number(limit)
  } else {
    req.sanitizedQuery.limit = undefined
  }

  if (req.sanitizedQuery.limit && req.sanitizedQuery.page) {
    req.sanitizedQuery.skip =
      (req.sanitizedQuery.page - 1) * req.sanitizedQuery.limit
  } else {
    req.sanitizedQuery.skip = 0
  }

  return next()
}

export default sanitizePaginationQueryParamsMiddleware
