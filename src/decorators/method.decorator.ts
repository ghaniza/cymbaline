const MethodDecorator = (method: string, path: string, httpCode: number) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!target?.router)
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [{
                        propertyKey,
                        method,
                        path,
                        httpCode,
                        handler: descriptor.value
                    }]
                },
            })
        else {
            const routes = target.router;

            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [
                        ...routes,
                        {
                            propertyKey,
                            method,
                            path,
                            httpCode,
                            handler: descriptor.value,
                            arguments: []
                        }]
                },
            })
        }

        Reflect.defineMetadata(propertyKey, {
            propertyKey,
            method,
            path,
            httpCode,
            handler: descriptor.value,
            arguments: []
        }, target)
    }
}

export const Get = (path: string, httpCode: number = 200) => MethodDecorator('get', path, httpCode)
export const Post = (path: string, httpCode: number = 201) => MethodDecorator('post', path, httpCode)
export const Put = (path: string, httpCode: number = 200) => MethodDecorator('put', path, httpCode)
export const Patch = (path: string, httpCode: number = 200) => MethodDecorator('patch', path, httpCode)
export const Delete = (path: string, httpCode: number = 200) => MethodDecorator('delete', path, httpCode)
export const Options = (path: string, httpCode: number = 204) => MethodDecorator('options', path, httpCode)
export const Head = (path: string, httpCode: number = 200) => MethodDecorator('head', path, httpCode)