import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common'
import { UpdateCustomerValidation } from 'src/api/customer/dto/update-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: string, params: UpdateCustomerValidation): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ id })
    if (!customer) throw new NotFoundException('Customer not found!')

    const existingEmailCustomer = await this.customerRepository.findOne({ email: params.email })
    if (existingEmailCustomer && existingEmailCustomer.id !== id) {
      throw new PreconditionFailedException('Email already exists for another customer!')
    }

    customer.updatedAt = new Date()

    const updatedCustomer = await this.customerRepository.update(id, params)

    return updatedCustomer
  }
}
