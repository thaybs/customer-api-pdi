import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CustomerController } from './customer.controller'
import { customerProviders } from './customer.providers'
import CustomerService from './customer.service'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProviders],
})
export class CustomerModule {}
