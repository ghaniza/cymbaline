export const ArgumentDecorator = (payload: any) => {
    return (target: any, propertyKey: string, index: number) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const route = Reflect.getMetadata(propertyKey, target)
            route.arguments.splice(index, 1, payload)
            Reflect.defineMetadata(propertyKey, route, target)
        } else {
            const args = []

            for (let i = 0; i < index + 1; i++) {
                if (i === index) args.push(payload)
                else args.push(undefined)
            }

            Reflect.defineMetadata(propertyKey, { arguments: args }, target)
        }
    }
}

export const Body = (key?: string, options?: { parse?: boolean }) =>
    ArgumentDecorator({ type: 'body', key, parse: options?.parse })
export const Param = (key?: string) => ArgumentDecorator({ type: 'param', key })
export const Query = (key?: string) => ArgumentDecorator({ type: 'query', key })
export const Req = (options = { parsed: true }) => ArgumentDecorator({ type: 'req', parsed: options.parsed })
export const Res = (options?: { skipSend?: boolean }) => ArgumentDecorator({ type: 'res', skip: options?.skipSend })
export const ReceiptHandle = () => ArgumentDecorator({ type: 'receiptHandler' })
export const MsgId = () => ArgumentDecorator({ type: 'messageId' })
export const EventSource = () => ArgumentDecorator({ type: 'eventSource' })
export const MD5OfBody = () => ArgumentDecorator({ type: 'md5OfBody' })
export const MsgAtt = () => ArgumentDecorator({ type: 'messageAttributes' })
export const Att = () => ArgumentDecorator({ type: 'attributes' })
