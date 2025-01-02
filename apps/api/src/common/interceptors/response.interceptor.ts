import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
// import { ExceptionFilterType } from '../interfaces'

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  constructor(private readonly filterParam: any) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { logger, asyncRequestContext } = this.filterParam

    return next.handle().pipe(
      tap(() => {
        logger.log('SUCCESS', asyncRequestContext.getRequestIdStore())
        asyncRequestContext.exit()
      }),
    )
  }
}
