//create-customer-use-case.ts
import { Injectable } from '@nestjs/common'
import { CreateCustomerParams, CreateCustomerResponse } from 'src/api/customer/ICreateCustomer'
import { CustomerService } from 'src/infra/modules/customer/customer.service'

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(params: CreateCustomerParams): Promise<CreateCustomerResponse> {
    const customer = await this.customerService.createCustomer(params)

    return customer
  }
}
