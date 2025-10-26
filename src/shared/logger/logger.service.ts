import { Injectable, Scope } from '@nestjs/common'
import { createLogger, Logger, transports } from 'winston'

import { RequestContext } from '../request-context/request-context.dto'

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private context?: string
  private logger: Logger

  public setContext(context: string): void {
    this.context = context
  }

  constructor() {
    this.logger = createLogger({
      transports: [new transports.Console()],
    })
  }

  error(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString()

    return this.logger.error({
      contextName: this.context,
      ctx,
      message,
      timestamp,
      ...meta,
    })
  }

  warn(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString()

    return this.logger.warn({
      contextName: this.context,
      ctx,
      message,
      timestamp,
      ...meta,
    })
  }

  debug(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString()

    return this.logger.debug({
      contextName: this.context,
      ctx,
      message,
      timestamp,
      ...meta,
    })
  }

  verbose(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString()

    return this.logger.verbose({
      contextName: this.context,
      ctx,
      message,
      timestamp,
      ...meta,
    })
  }

  log(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString()

    return this.logger.info({
      contextName: this.context,
      ctx,
      message,
      timestamp,
      ...meta,
    })
  }
}
