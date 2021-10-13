import { injectable } from 'tsyringe'
import { randomUUID } from 'crypto'
import { AwsService } from '../services/aws/aws.service'

export type QueueOptions = {
    deleteMessageOnSuccess?: boolean
    queueARN?: string
    memorySizeInMB?: number
    timeoutInSeconds?: number
}

export const Queue = (id: string, options?: QueueOptions) => {
    return <T extends { new (...args: any[]): {}; uid?: string }>(constructor: T) => {
        @injectable()
        class QueueClass extends constructor {
            static uid = constructor.uid ?? randomUUID()
            static queueId = id
            constructorName = constructor.name
            middlewares = []
            deleteOnSuccess = options?.deleteMessageOnSuccess ?? false
            timeout = options?.timeoutInSeconds ?? 6
            memorySize = options?.memorySizeInMB ?? 1024
            queueARN = options?.queueARN ?? process.env[id.toUpperCase() + '_ARN']

            public async deleteMessageOnSuccess(receiptHandle: string) {
                if (!this.deleteOnSuccess) return

                const awsService = new AwsService()

                const queueUrl = await awsService.getQueueUrl(this.queueARN)
                await awsService.deleteMessage(queueUrl, receiptHandle)
            }
        }

        return QueueClass
    }
}
