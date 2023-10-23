import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CustomerController } from './customer.controller'
import { customerProviders } from './customer.providers'
import CustomerService from './customer.service'
import { AuthService } from 'src/auth/auth.service'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [AuthService, CreateCustomerUseCase, CustomerService, ...customerProviders],
})
export class CustomerModule {}
