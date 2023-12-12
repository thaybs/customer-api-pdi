import { Injectable, NotFoundException } from '@nestjs/common'
import { DeleteCustomerByIdValidation } from 'src/api/customer/dto/delete-customer-by-id-dto'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

@Injectable()
export class DeleteCustomerByIdUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(params: DeleteCustomerByIdValidation): Promise<void> {
    const customer = await this.customerRepository.findOne({ id: params.id })
    if (!customer) throw new NotFoundException('Customer not found!')

    await this.customerRepository.delete(params.id)
  }
}
