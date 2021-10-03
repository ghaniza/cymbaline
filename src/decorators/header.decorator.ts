export const Header = (header: string, value: string) => {
    return (target: any, propertyKey: string) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const previous = Reflect.getMetadata(propertyKey, target)
            Reflect.defineMetadata(
                propertyKey,
                {
                    ...previous,
                    headers: [...previous.headers, [header, value]],
                },
                target
            )
        } else {
            const data = {
                propertyKey,
                headers: [[header, value]],
            }

            Reflect.defineMetadata(propertyKey, data, target)
        }
    }
}
