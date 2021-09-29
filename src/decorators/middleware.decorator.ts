import {RequestHandler} from "express";

export const Middleware = (middleware: RequestHandler | RequestHandler[]) => {
    return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
        console.log({ type: 'middleware', target, propertyName, descriptor })

        if(!target.middlewares) {
            Object.defineProperty(target, 'middlewares', {
                configurable: true,
                get: () => {
                    if(!Array.isArray(middleware))
                        return [{ propertyName, middleware }]
                    return [{ propertyName, middleware: [ middleware ] }]
                },
                set: () => {},
            })
        } else {
            const middlewares = target.middlewares

            Object.defineProperty(target, 'middlewares', {
                configurable: true,
                get: () => {
                    if(!Array.isArray(middleware))
                        return [...middlewares, { propertyName, middleware }]
                    return [...middlewares, { propertyName, middleware: [ middleware ] }]
                },
                set: () => {},
            })
        }
    }
}