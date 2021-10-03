import { injectable } from 'tsyringe'
import { randomUUID } from 'crypto'

export const Controller = (path: string) => {
    return function <T extends { new (...args: any[]): {}; uid?: string }>(constructor: T) {
        @injectable()
        class ControllerClass extends constructor {
            controllerName = constructor.name
            path = path
            middlewares = []
        }

        Object.defineProperty(ControllerClass.prototype, 'uid', {
            value: randomUUID(),
        })

        return ControllerClass
    }
}
