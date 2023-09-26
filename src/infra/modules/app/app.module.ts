import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerModule } from '../customer/modules/customer.module'

@Module({
  imports: [
    CustomerModule,
    MongooseModule.forRoot(
      'mongodb+srv://customer-api:customerpass0@cluster0.n0wxypo.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
