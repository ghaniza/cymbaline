export const QueueHandler = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const queue = Reflect.getMetadata(propertyKey, target)
            Reflect.defineMetadata(propertyKey, { ...queue, handler: descriptor.value }, target)
        } else {
            Reflect.defineMetadata('handler', { handler: descriptor.value }, target)
        }
    }
}
