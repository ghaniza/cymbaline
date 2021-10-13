import { RequestHandler } from 'express'
import { CustomMiddleware } from '../middlewares'
import { randomUUID } from 'crypto'

const MethodMiddleware = (target: any, propertyKey: string, middleware: any) => {
    const mws = Array.isArray(middleware) ? middleware : [middleware]

    if (Reflect.hasMetadata(propertyKey, target)) {
        const value = Reflect.getMetadata(propertyKey, target)
        const middlewares = Array.isArray(value?.middlewares) ? [...value.middlewares, ...mws] : mws
        Reflect.defineMetadata(propertyKey, { ...value, middlewares }, target)
    } else {
        const data = {
            propertyKey,
            middlewares: mws,
        }

        Reflect.defineMetadata(propertyKey, data, target)
    }
}

const ClassMiddleware = <T extends { new (...args: any[]): {}; uid: string }>(constructor: T, middleware: any) => {
    const mws = Array.isArray(middleware) ? middleware : [middleware]

    if (!constructor.uid) constructor.uid = randomUUID()

    if (Reflect.hasMetadata(constructor.uid + ':middlewares', constructor.prototype, 'middlewares')) {
        const previous = Reflect.getMetadata(constructor.uid + ':middlewares', constructor.prototype, 'middlewares')
        Reflect.defineMetadata(
            constructor.uid + ':middlewares',
            [...previous, ...mws],
            constructor.prototype,
            'middlewares'
        )
    } else {
        Reflect.defineMetadata(constructor.uid + ':middlewares', mws, constructor.prototype, 'middlewares')
    }

    return constructor
}

export const Middleware = (
    middleware: RequestHandler | RequestHandler[] | { new (): CustomMiddleware } | { new (): CustomMiddleware }[]
) => {
    return (...args: any[]) => {
        if (args.length === 3) return MethodMiddleware(args[0], args[1], middleware)
        return ClassMiddleware(args[0], middleware)
    }
}
