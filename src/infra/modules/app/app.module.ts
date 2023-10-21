import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerModule } from '../customer/customer.module'

@Module({
  imports: [CustomerModule, MongooseModule.forRoot(process.env.MONGO_URL)],
})
export class AppModule {}
