import { injectable } from 'tsyringe'
import { randomUUID } from 'crypto'

export type QueueOptions = {
    deleteMessageOnSuccess?: boolean
}

export const Queue = (id: string, options?: QueueOptions) => {
    return <T extends { new (...args: any[]): {}; uid?: string }>(constructor: T) => {
        @injectable()
        class QueueClass extends constructor {
            static uid = constructor.uid ?? randomUUID()
            constructorName = constructor.name
            queueId = id
            middlewares = []
            deleteOnSuccess = options?.deleteMessageOnSuccess ?? false
        }

        return QueueClass
    }
}
