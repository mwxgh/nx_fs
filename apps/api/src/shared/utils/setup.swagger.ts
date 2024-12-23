import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication): void => {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      `[REST Resource Naming Guide](https://restfulapi.net/resource-naming/)`,
    )
    .setVersion('1.0')

  const document = SwaggerModule.createDocument(app, documentBuilder.build())
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}
