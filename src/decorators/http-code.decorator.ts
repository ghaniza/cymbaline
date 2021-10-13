export const HttpCode = (httpCode: number) => {
    return (target: any, propertyKey: string) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const value = Reflect.getMetadata(propertyKey, target)
            Reflect.defineMetadata(propertyKey, { ...value, httpCode }, target)
        } else {
            const data = {
                propertyKey,
                httpCode,
            }

            Reflect.defineMetadata(propertyKey, data, target)
        }
    }
}
