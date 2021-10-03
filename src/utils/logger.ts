import { Logger } from '../server'
import chalk from 'chalk'

export class DefaultLogger implements Logger {
    log(level: 'debug' | 'info' | 'warn' | 'error', args: any): void {
        if (!process.env.DEBUG) return

        let color: string

        switch (level) {
            case 'error':
                color = 'red'
                break
            case 'warn':
                color = 'yellow'
                break
            default:
                color = 'white'
        }

        console[level](chalk[color](args))
    }
}
