import { RequestHandler } from 'express'
import { CustomMiddleware } from '../middlewares'

export const Middleware = (
    middleware: RequestHandler | RequestHandler[] | { new (): CustomMiddleware } | { new (): CustomMiddleware }[]
) => {
    return (target: any, propertyKey: string) => {
        const mws = Array.isArray(middleware) ? middleware : [middleware]

        if (Reflect.hasMetadata(propertyKey, target)) {
            const value = Reflect.getMetadata(propertyKey, target)
            Reflect.defineMetadata(propertyKey, { ...value, middlewares: [...value.middlewares, ...mws] }, target)
        } else {
            const data = {
                propertyKey,
                middlewares: mws,
            }

            Reflect.defineMetadata(propertyKey, data, target)
        }
    }
}
