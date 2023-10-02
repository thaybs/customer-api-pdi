import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerModule } from '../customer/modules/customer.module'

@Module({
  imports: [CustomerModule, MongooseModule.forRoot(process.env.MONGO_URL)],
})
export class AppModule {}
