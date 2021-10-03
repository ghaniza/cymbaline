import { Queue } from '../../../src/decorators/queue.decorator'
import { QueueHandler } from '../../../src/decorators/queue-handler.decorator'
import { MsgId } from '../../../src/decorators/argument.decorator'
import { AService } from '../a/a.service'

@Queue('a-queue')
export class AQueue {
    constructor(private readonly aService: AService) {}

    @QueueHandler()
    public async handler(@MsgId() messageId: string) {
        await this.aService.displayMessage(messageId)
    }
}
