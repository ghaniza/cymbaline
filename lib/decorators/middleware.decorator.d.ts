import { RequestHandler } from "express";
export declare const Middleware: (middleware: RequestHandler | RequestHandler[]) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
