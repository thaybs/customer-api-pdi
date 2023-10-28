import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CustomerController } from './customer.controller'
import { customerProviders } from './customer.providers'
import { AuthService } from 'src/auth/auth.service'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [AuthService, CreateCustomerUseCase, ListCustomerUseCase, ...customerProviders],
})
export class CustomerModule {}
