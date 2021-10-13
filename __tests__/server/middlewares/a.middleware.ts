import { Request, Response, NextFunction } from 'express'

export const AMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('custom', 'injected by ResponseHandler middleware')
    next()
}
