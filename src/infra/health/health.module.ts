import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [TerminusModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/customerapp')],
  controllers: [HealthController],
})
export class HealthModule {}
