export const Body = () => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        if (!target?.router) {
            const routes: any[] = target.router;
            const route = routes.find(r => r.propertyKey === propertyKey)

            if(route)
                Object.defineProperty(target, 'router', {
                    configurable: true,
                    get: () => {
                        return [
                            ...routes,
                            {...route, arguments: [...route.arguments, {index: parameterIndex, value: 'request.body'}]}
                        ]
                    }
                })
            else
                Object.defineProperty(target, 'router', {
                    configurable: true,
                    get: () => {
                        return [
                            ...routes,
                            { propertyKey, arguments: [ { index: parameterIndex, value: 'request.body' }]}
                        ]
                    }
                })
        } else {
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [ { arguments: [{ index: parameterIndex, value: 'request.body'} ]} ]
                }
            })
        }
    }
}