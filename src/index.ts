import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { Server } from './server'
import { config } from 'dotenv'

config()

export { injectable as Injectable }

export default Server
