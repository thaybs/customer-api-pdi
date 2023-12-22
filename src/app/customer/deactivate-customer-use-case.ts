import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common'
import { DeactivateCustomerValidation } from 'src/api/customer/dto/deactivate-customer-by-id-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

@Injectable()
export class DeactivateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(params: DeactivateCustomerValidation): Promise<void> {
    const customer = await this.customerRepository.findOne(params)
    if (!customer) throw new NotFoundException('Customer not found!')

    if (!customer.active) throw new PreconditionFailedException('Customer already deactivated!')

    Customer.deactivate(customer)

    await this.customerRepository.update(params.id, customer)
  }
}
