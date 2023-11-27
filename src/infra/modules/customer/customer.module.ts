import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CustomerController } from './customer.controller'
import { customerProviders } from './customer.providers'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'
import { CustomerModel } from '../database/mongoose/customer/schema/customer.schema'
import { AuthService } from 'src/infra/auth/auth.service'
import MongooseRepository from '../database/mongoose/mongoose.repository'
import { Model } from 'mongoose'
import { GetCustomerByIdUseCase } from 'src/app/customer/get-customer-by-id-use-case'
import { DeleteCustomerByIdUseCase } from 'src/app/customer/delete-customer-by-id-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    {
      provide: CUSTOMER_MODEL,
      useValue: CustomerModel,
    },
    {
      provide: Model,
      useValue: CustomerModel,
    },
    MongooseRepository,
    AuthService,
    CreateCustomerUseCase,
    ListCustomerUseCase,
    GetCustomerByIdUseCase,
    DeleteCustomerByIdUseCase,
    ...customerProviders,
  ],
})
export class CustomerModule {}
