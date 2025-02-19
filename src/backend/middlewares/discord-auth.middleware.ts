import express from 'express'
import { getMe } from '../../shared/discord-api/discord-api.service'
import { RequestWithUser } from '../dto/request-with-user.dto'

async function discordAuthMiddleware(
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Token is required' })
    }
    console.log('shit2')

    const user = await getMe(token)
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    console.log('uspeh')
    req.user = user
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const discordAuthMiddlewareTyped =
  discordAuthMiddleware as express.RequestHandler
