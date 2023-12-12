import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/modules/app/app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Customer')
    .setDescription('Customer API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
