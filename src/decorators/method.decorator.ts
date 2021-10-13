import { validate } from 'class-validator'
import { classToPlain, plainToClass } from 'class-transformer'
import { BadRequestException } from '../exceptions/bad-request.exception'

const MethodDecorator = (method: string, path: string, httpCode: number) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const paramTypes = Reflect.getOwnMetadata('design:paramtypes', target, propertyKey)

        const handler = async function (...args: any[]) {
            await Promise.all(
                args.map(async (arg, index) => {
                    if (typeof arg === 'object') {
                        const value = plainToClass(paramTypes[index], arg)
                        const errors = await validate(value)

                        if (errors.length) {
                            throw new BadRequestException(
                                'Validation Error',
                                'The following fields failed on validation: ' +
                                    errors
                                        .map((e) => e.constraints)
                                        .reduce((p, c) => p + Object.values(c).join(', '), '')
                            )
                        }
                    }
                })
            )
            const response = await descriptor.value.apply(this, args)

            if (typeof response === 'object' && response.constructor.prototype !== global.Object) {
                const errors = await validate(response)

                if (errors.length)
                    throw new BadRequestException(
                        'Validation Error',
                        'The following fields failed on validation: ' +
                            errors.map((e) => e.constraints).reduce((p, c) => p + Object.values(c).join(', '), '')
                    )

                return classToPlain(response)
            }

            return response
        }

        const data = {
            propertyKey,
            method,
            path,
            httpCode,
            handler,
            arguments: [],
            middlewares: [],
            headers: [],
        }

        if (Reflect.hasMetadata(propertyKey, target)) {
            const route = Reflect.getMetadata(propertyKey, target)
            Reflect.defineMetadata(propertyKey, { ...data, ...route }, target)
        } else {
            Reflect.defineMetadata(propertyKey, data, target)
        }
    }
}

export const Get = (path: string, httpCode: number = 200) => MethodDecorator('get', path, httpCode)
export const Post = (path: string, httpCode: number = 201) => MethodDecorator('post', path, httpCode)
export const Put = (path: string, httpCode: number = 200) => MethodDecorator('put', path, httpCode)
export const Patch = (path: string, httpCode: number = 200) => MethodDecorator('patch', path, httpCode)
export const Delete = (path: string, httpCode: number = 200) => MethodDecorator('delete', path, httpCode)
export const Options = (path: string, httpCode: number = 204) => MethodDecorator('options', path, httpCode)
export const Head = (path: string, httpCode: number = 200) => MethodDecorator('head', path, httpCode)
export const Trace = (path: string, httpCode: number = 200) => MethodDecorator('trace', path, httpCode)
