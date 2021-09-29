const HttpCode = (httpCode: number) => {
    return (target: any, propertyKey: string) => {
        console.log({ type: 'code', target, propertyKey })

        if (!target?.router)
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [{
                        propertyName: propertyKey,
                        httpCode,
                    }]
                },
            })
        else {
            const previousRoute = target.router.find(r => r.propertyName === propertyKey);
            const routes = target.router.filter(r => r.propertyName !== propertyKey)

            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [
                        ...routes,
                        {
                            ...previousRoute,
                            httpCode,
                        }]
                },
            })
        }
    }
}