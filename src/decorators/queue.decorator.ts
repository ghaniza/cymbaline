import { injectable } from 'tsyringe'

export type QueueOptions = {
    deleteMessageOnSuccess?: boolean
}

export const Queue = (id: string, options?: QueueOptions) => {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        @injectable()
        class QueueClass extends constructor {
            constructorName = constructor.name
            queueId = id
            middlewares = []
            deleteOnSuccess = options?.deleteMessageOnSuccess ?? false
        }

        return QueueClass
    }
}
