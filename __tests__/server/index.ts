import Server from '../../src'
import express from 'express'
import { Database } from './database'
import { AController } from './a/a.controller'
import { BController } from './b/b.controller'
import { AQueue } from './a/a.queue'
import { BQueue } from './b/b.queue'
import { CController } from './c/c.controller'

const server = new Server({
    dependencies: [Database.configure()],
    controllers: [CController, AController, BController],
    middlewares: [express.json(), express.urlencoded({ extended: true })],
    queues: [BQueue, AQueue],
})

export const handler = server.getApiHandler()
export const aQueue = server.getQueueHandler('a-queue')
export const bQueue = server.getQueueHandler('b-queue')
