import Server from '../../src'
import express from 'express'
import { Database } from './database'
import { AController } from './a/a.controller'
import { BController } from './b/b.controller'

const server = new Server({
    dependencies: [Database.configure()],
    controllers: [AController, BController],
    middlewares: [express.json(), express.urlencoded({ extended: true })],
    queues: [],
})

export const handler = server.getApiHandler()
