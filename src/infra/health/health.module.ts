import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [TerminusModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [HealthController],
})
export class HealthModule {}
