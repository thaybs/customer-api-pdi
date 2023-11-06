import { Injectable, PreconditionFailedException } from '@nestjs/common'
import { CreateCustomerValidation } from 'src/api/customer/validations/create-customer-validation'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerService } from 'src/infra/modules/database/mongoose/customer/customer.service'

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(params: CreateCustomerValidation): Promise<Customer> {
    const existingCustomer = await this.customerService.findCustomerByEmail(params.email)
    if (existingCustomer) {
      throw new PreconditionFailedException('Email already exists!')
    }

    const customer = await this.customerService.createCustomer(params)

    return customer
  }
}
