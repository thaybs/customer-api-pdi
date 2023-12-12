import { Injectable } from '@nestjs/common'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/dto/list-customer-dto'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

@Injectable()
export class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(params: ListCustomerDto): Promise<ListCustomerResponse> {
    const { name, document, active, page, pageSize } = params

    let filter = { name, document, active }

    const customer = await this.customerRepository.findAllWithPaginationAndFilters(filter, page, pageSize)

    return { page, pageSize, data: customer }
  }
}
