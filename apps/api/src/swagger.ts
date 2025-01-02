import { Logger, type INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import config from './config/app.config'
import { AppConstant } from './common/constants'

export const setupSwagger = (app: INestApplication): void => {
  const { port, env } = config().app

  if (![AppConstant.dev].includes(env)) return

  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      `[REST Resource Naming Guide](https://restfulapi.net/resource-naming/)`,
    )
    .addBearerAuth()
    .setVersion('1.0')

  const document = SwaggerModule.createDocument(app, documentBuilder.build())
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  Logger.log(`🚀 Swagger is running on: http://localhost:${port}/swagger`)
}
