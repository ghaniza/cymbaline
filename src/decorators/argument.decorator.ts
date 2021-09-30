export const ArgumentDecorator = (payload: any) => {
    return (target: any, propertyKey: string, index: number) => {
        if(Reflect.hasMetadata(propertyKey, target)) {
            const route = Reflect.getMetadata(propertyKey, target);

            if(route.arguments.length <= index) {
                const args = [];

                for(let i = 0; i < index + 1; i++) {
                    if(i === index) args.push(payload)
                    else args.push(route.arguments[i] ?? undefined)
                }
                route.arguments = args

            } else {
                route.arguments.splice(index, 1, payload)
            }

            Reflect.defineMetadata(propertyKey, route, target)
        } else {
            const args = [];

            for(let i = 0; i < index + 1; i++) {
                if(i === index) args.push(payload)
                else args.push(undefined)
            }

            Reflect.defineMetadata(propertyKey,{ arguments: args }, target)
        }
    }
}

export const Body = (key?: string) => ArgumentDecorator({ type: 'body', key })
export const Param = (key?: string) => ArgumentDecorator({ type: 'param', key })
export const Query = (key?: string) => ArgumentDecorator({ type: 'query', key })
export const Req = () => ArgumentDecorator({ type: 'req' })
export const Res = (skipSend?: boolean) => ArgumentDecorator({ type: 'res', skip: skipSend })