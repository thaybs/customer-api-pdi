import { Injectable, PreconditionFailedException } from '@nestjs/common'
import { CreateCustomerValidation } from 'src/api/customer/dto/create-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

@Injectable()
export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(params: CreateCustomerValidation): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findOne({ email: params.email })
    if (existingCustomer) throw new PreconditionFailedException('Email already exists!')

    const customer = Customer.create(params)

    return this.customerRepository.create(customer)
  }
}
