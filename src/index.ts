import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { Server } from './server'
import { config } from 'dotenv'
// import '../__tests__/server'

config()

export { injectable as Injectable }

export default Server
