const MethodDecorator = (method: string, path: string, httpCode: number) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const data = {
            propertyKey,
            method,
            path,
            httpCode,
            handler: descriptor.value,
            arguments: [],
            middlewares: [],
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
