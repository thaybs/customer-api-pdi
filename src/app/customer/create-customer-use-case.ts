import { Injectable, Post, Body, Inject, PreconditionFailedException } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateCustomerParams, CreateCustomerResponse } from 'src/api/customer/ICreateCustomer'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'
import { Customer } from 'src/domain/Customer'

@Injectable()
export class CreateCustomerUseCase {
  constructor(@Inject(CUSTOMER_MODEL) private readonly customerModel: Model<Customer>) {}
  execute(params: CreateCustomerParams): Promise<CreateCustomerResponse> {
    const createdCustomer = new this.customerModel(params)

    return createdCustomer.save()
  }
}
