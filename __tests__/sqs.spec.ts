import { sqsEvent } from './utils/create-api-event'
import { aQueue, bQueue } from './server'
import { randomUUID } from 'crypto'

describe('Server - SQS', () => {
    let consoleSpy: jest.SpyInstance

    beforeAll(() => {
        delete process.env.DEBUG
        consoleSpy = jest.spyOn(global.console, 'log')
    })

    beforeEach(() => {
        consoleSpy.mockReset()
    })

    it('Should get response with parsed body - JSON', async () => {
        const record = {
            body: JSON.stringify({ a: 47 }),
            messageAttributes: {
                'Content-Type': {
                    stringValue: 'application/json',
                    dataType: 'String',
                },
            },
        }
        const event = sqsEvent([record])
        await aQueue(event, null, () => {})

        expect(consoleSpy).toHaveBeenCalledWith('The body is: ' + record.body)
    })

    it('Should get response with parsed body - URL encoded', async () => {
        const record = {
            body: 'a=47&b=hello',
            messageAttributes: {
                'Content-Type': {
                    stringValue: 'application/x-www-form-urlencoded',
                    dataType: 'String',
                },
            },
        }
        const event = sqsEvent([record])
        await aQueue(event, null, () => {})

        expect(consoleSpy).toHaveBeenCalledWith('The body is: {"a":"47","b":"hello"}')
    })

    it('Should get response without parsed body', async () => {
        const record = {
            body: 'some body',
        }
        const event = sqsEvent([record])
        await aQueue(event, null, () => {})

        expect(consoleSpy).toHaveBeenCalledWith('The body is: ' + JSON.stringify(record.body))
    })

    it('Should get messageId', async () => {
        const record = {
            body: JSON.stringify({ message: 'Hello World!' }),
            messageId: randomUUID(),
            messageAttributes: {
                'Content-Type': {
                    stringValue: 'application/json',
                    dataType: 'String',
                },
            },
        }
        const event = sqsEvent([record])
        await bQueue(event, null, () => {})

        expect(consoleSpy).toHaveBeenCalledWith(`[${record.messageId}] The message is: Hello World!`)
    })
})
