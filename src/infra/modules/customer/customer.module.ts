import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CustomerController } from './customer.controller'
import { customerProviders } from './customer.providers'
import { AuthService } from 'src/auth/auth.service'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'
import { CustomerModel } from './schemas/customer.model'
import { CustomerService } from './customer.service'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    {
      provide: CUSTOMER_MODEL,
      useValue: CustomerModel,
    },
    AuthService,
    CustomerService,
    CreateCustomerUseCase,
    ListCustomerUseCase,
    ...customerProviders,
  ],
})
export class CustomerModule {}
