import { Injectable, Inject } from '@nestjs/common'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/list-customer-dto'
import { CustomerService } from 'src/infra/modules/database/mongoose/customer/customer.service'

@Injectable()
export class ListCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}
  async execute(params: ListCustomerDto): Promise<ListCustomerResponse> {
    const customers = await this.customerService.findCustomersWithPagination(params)

    return customers
  }
}
