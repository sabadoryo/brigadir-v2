import { NextFunction, Request, Response } from 'express'
import { getMe } from '../../shared/discord-api/discord-api.service'
import CustomHttpError from '../errors/custom-http-error'
async function discordAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return next(new CustomHttpError('Token is required', 401))
    }

    const user = await getMe(token)
    if (!user) {
      return next(new CustomHttpError('Invalid token', 401))
    }

    req.user = user
    return next()
  } catch (error) {
    console.log(error)
    return next(new CustomHttpError('Server auth error', 500))
  }
}

export default discordAuthMiddleware
