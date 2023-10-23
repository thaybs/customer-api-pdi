import { Injectable, Post, Body, Inject, PreconditionFailedException } from '@nestjs/common'
import { Model } from 'mongoose'
import { ICreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { ICustomer } from 'src/domain/Customer'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'
import CustomerService from 'src/infra/modules/customer/customer.service'
import { createCustomerSchema } from './schemas/create-customer-schema'

@Injectable()
export class CreateCustomerUseCase {
  constructor(@Inject(CUSTOMER_MODEL) private readonly customerModel: Model<ICustomer>) {}
  execute(params: ICreateCustomerParams): Promise<ICustomer> {
    try {
      const validatedData = createCustomerSchema.parse(params)
      const createdCustomer = new this.customerModel(validatedData)

      return createdCustomer.save()
    } catch (error) {
      throw new PreconditionFailedException()
    }
  }
}
