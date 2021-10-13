import server from './server'
import { createAPIGatewayEvent } from '../src/utils/create-api-event'

describe('Server - API Gateway', () => {
    beforeAll(() => {
        // delete process.env.DEBUG
    })

    it('Should get a route with injected class', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/service', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('text')).toBeTruthy()
        expect(response.body).toEqual('Hello World!')
    })

    it('Should get a route', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/a', method: 'GET' }))

        expect(response.statusCode).toEqual(400)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ error: 'Bad Request' }))
    })

    it('Should post to a route', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/a', method: 'POST' }))

        expect(response.statusCode).toEqual(201)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'You just posted' }))
    })

    it('Should not post upon a invalid body', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/a-error', method: 'POST' }))

        expect(response.statusCode).toEqual(400)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(
            '{"error":"Validation Error","error_description":"The following fields failed on validation: message must be a string"}'
        )
    })

    it('Should have a custom header', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/by-id/123456', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('text/html')).toBeTruthy()
        expect(response.headers['custom-header']).toEqual('custom value')
        expect(response.body).toEqual('The ID is 123456')
    })

    it('Should get a parsed value', async () => {
        const queryString = { token: 'supersecret' }
        const body = JSON.stringify({ a: 1, b: '2' })
        const headers = { 'Content-Type': 'application/json' }

        const response = await server.apiHandler(
            createAPIGatewayEvent({ path: '/abc123/parsed', method: 'POST', queryString, body, headers })
        )

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('text/html')).toBeTruthy()
        expect(response.body).toEqual(
            `This is the body: ${body}, with "a" param: abc123 and query: ${JSON.stringify({
                token: 'supersecret',
            })}`
        )
    })

    it('Should not get a parsed value', async () => {
        const queryString = { token: 'ultra this time => supersecret' }
        const body = JSON.stringify({ a: '1', b: '2' })
        const headers = { 'Content-Type': 'application/json' }

        const response = await server.apiHandler(
            createAPIGatewayEvent({ path: '/jaguatirica/parsed', method: 'POST', queryString, body, headers })
        )

        expect(response.statusCode).toEqual(400)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(
            '{"error":"Validation Error","error_description":"The following fields failed on validation: a must be a number conforming to the specified constraints"}'
        )
    })

    it('Should get with ResponseHandler injection', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/b', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.headers.custom).toEqual('injected by ResponseHandler middleware')
        expect(response.body).toEqual(JSON.stringify({ message: 'Success' }))
    })

    it('Should get route with CustomMiddleware injection', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/c', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.headers.custom).toEqual('injected by Middleware middleware')
        expect(response.body).toEqual(JSON.stringify({ message: 'Success' }))
    })

    it('Should get from another controller', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'GET' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'Hello from another controller!' }))
    })

    it('Should put successfully', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'PUT' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'Hello from PUT method' }))
    })

    it('Should patch successfully', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'PATCH' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'Hello from PATCH method' }))
    })

    it('Should delete successfully', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'DELETE' }))

        expect(response.statusCode).toEqual(200)
        expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy()
        expect(response.body).toEqual(JSON.stringify({ message: 'Hello from DELETE method' }))
    })

    it('Should options successfully', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'OPTIONS' }))

        expect(response.statusCode).toEqual(204)
        expect(response.body).toEqual('')
    })

    it('Should head successfully', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'HEAD' }))

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual('')
    })

    it('Should trace successfully', async () => {
        const response = await server.apiHandler(createAPIGatewayEvent({ path: '/other', method: 'TRACE' }))

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual('')
    })

    it('Should get controller middleware injection', async () => {
        const response = await server.apiHandler(
            createAPIGatewayEvent({
                path: '/controller-c',
                method: 'GET',
                headers: {
                    'custom-controller-header': 'something special',
                },
            })
        )

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual('something special')
    })

    it('Should get controller middleware injection from other method', async () => {
        const response = await server.apiHandler(
            createAPIGatewayEvent({
                path: '/controller-c',
                method: 'POST',
                headers: {
                    'custom-controller-header': 'something special',
                },
            })
        )

        expect(response.statusCode).toEqual(201)
        expect(response.body).toEqual('something special')
    })

    it('Should process data', async () => {
        const queryString = {
            a: 4,
            b: 25,
            c: 1,
        }

        const response = await server.apiHandler(
            createAPIGatewayEvent({ path: '/other/processed', method: 'GET', queryString })
        )

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
