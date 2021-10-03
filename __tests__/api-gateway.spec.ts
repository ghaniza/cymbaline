import { handler } from './server'
import { apiEvent } from './utils/create-api-event'

describe('Server - API Gateway', () => {
    beforeAll(() => {
        delete process.env.DEBUG
    })

    it('Should get a route with injected class', async () => {
        const response = await handler(apiEvent({ path: '/service', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('text')).toBeTruthy()
        expect(response.body).toEqual('Hello World!')
    })

    it('Should get a route', async () => {
        const response = await handler(apiEvent({ path: '/a', method: 'GET' }))

        expect(response.statusCode).toEqual(400)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ error: 'Bad Request' }))
    })

    it('Should post to a route', async () => {
        const response = await handler(apiEvent({ path: '/a', method: 'POST' }))

        expect(response.statusCode).toEqual(201)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'You just posted' }))
    })

    it('Should get with RequestHandler injection', async () => {
        const response = await handler(apiEvent({ path: '/b', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.headers.custom).toEqual('injected by ResponseHandler middleware')
        expect(response.body).toEqual(JSON.stringify({ message: 'Success' }))
    })

    it('Should get route with CustomMiddleware injection', async () => {
        const response = await handler(apiEvent({ path: '/c', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.headers.custom).toEqual('injected by Middleware middleware')
        expect(response.body).toEqual(JSON.stringify({ message: 'Success' }))
    })

    it('Should get from another controller', async () => {
        const response = await handler(apiEvent({ path: '/other', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'Hello from another controller!' }))
    })

    it('Should process data', async () => {
        const queryString = {
            a: 4,
            b: 25,
            c: 1,
        }

        const response = await handler(apiEvent({ path: '/other/processed', method: 'GET', queryString }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(
            JSON.stringify({
                a: 40,
                b: 250,
                c: 10,
            })
        )
    })
})
