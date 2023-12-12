import { Injectable, NotFoundException } from '@nestjs/common'
import { GetCustomerByIdValidation } from 'src/api/customer/dto/get-customer-by-id-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

@Injectable()
export class GetCustomerByIdUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(params: GetCustomerByIdValidation): Promise<Customer> {
    const customer = await this.customerRepository.findOne(params)
    if (!customer) throw new NotFoundException('Customer not found!')

    return customer
  }
}
