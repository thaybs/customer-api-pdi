import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/modules/app/app.module'
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
