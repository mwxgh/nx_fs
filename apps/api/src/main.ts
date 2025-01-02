/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  HttpStatus,
  RequestMethod,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './swagger'
import config from './config/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  })

  // Use global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  )

  // Setup swagger
  setupSwagger(app)

  const { port } = config().app
  await app.listen(port)
}

bootstrap()
