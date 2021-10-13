import { Queue } from '../../../src/decorators/queue.decorator'
import { QueueHandler } from '../../../src/decorators/queue-handler.decorator'
import { Body } from '../../../src/decorators/argument.decorator'

@Queue('aQueue')
export class AQueue {
    @QueueHandler()
    public async handler(@Body() body: any) {
        console.log(`The body is: ${JSON.stringify(body)}`)
    }
}
