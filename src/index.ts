import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { config } from 'dotenv'

import { Server } from './server'
import { Controller } from './decorators/controller.decorator'
import { Queue } from './decorators/queue.decorator'
import { Get, Put, Post, Patch, Head, Trace, Delete, Options } from './decorators/method.decorator'
import { QueueHandler } from './decorators/queue-handler.decorator'
import { Middleware } from './decorators/middleware.decorator'
import { Header } from './decorators/header.decorator'
import { HttpCode } from './decorators/http-code.decorator'
import {
    Param,
    Query,
    Req,
    Res,
    Body,
    MD5OfBody,
    MsgId,
    MsgAtt,
    Att,
    EventSource,
    ReceiptHandle,
} from './decorators/argument.decorator'
import { BadRequestException } from './exceptions/bad-request.exception'
import { ForbiddenException } from './exceptions/forbidden.exception'
import { GoneException } from './exceptions/gone.exception'
import { MethodNotAllowedException } from './exceptions/method-not-allowed.exception'
import { InternalServerException } from './exceptions/internal-server.exception'
import { NotFoundException } from './exceptions/not-found.exception'
import { UnauthorizedException } from './exceptions/unauthorized.exception'
import { HTTPException } from './exceptions/http.exception'
import { CustomMiddleware } from './middlewares'

config()

export {
    //
    // Imports
    injectable as Injectable,
    //
    // Controllers
    Controller,
    Queue,
    //
    // Handlers
    QueueHandler,
    //
    // Middlewares
    Middleware,
    CustomMiddleware,
    HttpCode,
    Header,
    //
    // Property injectors
    Req,
    Res,
    Body,
    Query,
    Param,
    MD5OfBody,
    MsgAtt,
    MsgId,
    Att,
    EventSource,
    ReceiptHandle,
    //
    // HTTP Verbs
    Get,
    Post,
    Patch,
    Put,
    Options,
    Head,
    Trace,
    Delete,
    //
    // Standard Errors
    BadRequestException,
    ForbiddenException,
    GoneException,
    InternalServerException,
    MethodNotAllowedException,
    NotFoundException,
    UnauthorizedException,
    HTTPException,
}

export default Server
