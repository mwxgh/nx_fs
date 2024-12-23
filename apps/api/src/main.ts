/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, RequestMethod } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './shared/utils'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  })
  const port = process.env.PORT_API
  await app.listen(port)

  // Setup swagger
  setupSwagger(app)

  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
  Logger.log(`🚀 Swagger is running on: http://localhost:${port}/swagger`)
}

bootstrap()
