import { Queue } from '../../../src/decorators/queue.decorator'
import { QueueHandler } from '../../../src/decorators/queue-handler.decorator'
import { Body, MsgId } from '../../../src/decorators/argument.decorator'
import { BService } from './b.service'

@Queue('b-queue')
export class BQueue {
    constructor(private readonly bService: BService) {}

    @QueueHandler()
    public async handler(@MsgId() messageId: string, @Body('message') message) {
        console.log(await this.bService.sqsMessage(messageId, message))
    }
}
