import { Logger } from '../server';
export declare class DefaultLogger implements Logger {
    log(level: 'debug' | 'info' | 'warn' | 'error', args: any): void;
}
