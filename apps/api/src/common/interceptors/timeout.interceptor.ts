import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'
import config from '../../config/app.config'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly timeoutValue: number

  constructor() {
    const { timeout } = config().app
    this.timeoutValue =
      typeof timeout === 'string' ? parseInt(timeout, 10) : timeout

    if (isNaN(this.timeoutValue) || this.timeoutValue <= 0) {
      throw new Error(`Invalid timeout value: ${timeout}`)
    }
  }

  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeoutValue),
      catchError((err) =>
        err instanceof TimeoutError
          ? throwError(() => new RequestTimeoutException())
          : throwError(() => err),
      ),
    )
  }
}
