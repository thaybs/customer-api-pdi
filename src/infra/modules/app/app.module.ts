import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerModule } from '../customer/customer.module'
import { HealthModule } from 'src/infra/health/health.module'

@Module({
  imports: [CustomerModule, MongooseModule.forRoot(process.env.MONGO_URL), HealthModule],
})
export class AppModule {}
