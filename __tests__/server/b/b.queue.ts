import { Queue } from '../../../src/decorators/queue.decorator'
import { QueueHandler } from '../../../src/decorators/queue-handler.decorator'
import { Body, MsgAtt, MsgId } from '../../../src/decorators/argument.decorator'
import { BService } from './b.service'
import { Middleware } from '../../../src/decorators/middleware.decorator'
import { BQueueMiddleware } from '../middlewares/b.middleware'

@Middleware(BQueueMiddleware)
@Queue('bQueue')
export class BQueue {
    constructor(private readonly bService: BService) {}

    @QueueHandler()
    public async handler(@MsgId() messageId: string, @Body('message') message, @MsgAtt() messageAttributes: any) {
        const value = messageAttributes['injected-value']
        if (!message) console.log('The injected value is: ' + value.stringValue)
        else console.log(await this.bService.sqsMessage(messageId, message))
    }
}
