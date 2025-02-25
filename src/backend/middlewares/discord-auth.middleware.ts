import express, { Request } from 'express'
import { getMe } from '../../shared/discord-api/discord-api.service'
async function discordAuthMiddleware(
  req: Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Token is required' })
    }

    const user = await getMe(token)
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    req.user = user
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const discordAuthMiddlewareTyped =
  discordAuthMiddleware as express.RequestHandler
