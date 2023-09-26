import { Module } from '@nestjs/common'
import { CustomerController } from '../controllers/customer.controller'
import CustomerService from '../services/customer.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerSchema } from '../schemas/customer.schema'
import { customerProviders } from '../providers/customer.providers'
import { DatabaseModule } from '../../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProviders],
})
export class CustomerModule {}
