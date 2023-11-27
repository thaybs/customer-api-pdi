import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/dto/list-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerRepository } from 'src/infra/data/model/customer.repository'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class ListCustomerUseCase {
  constructor(
    private mongooseRepository: MongooseRepository<CustomerDocument>,
    private customerRepository: CustomerRepository,
  ) {}

  async execute(params: ListCustomerDto): Promise<ListCustomerResponse> {
    const { filter, page, pageSize } = params

    let filteredCustomers: Customer[]

    if (filter?.name || filter?.document) {
      filteredCustomers = await this.customerRepository.findAllByNamePartialMatch(params)
    } else {
      filteredCustomers = await this.mongooseRepository.findAllWithPaginationAndFilters(filter, page, pageSize)
    }

    return { page, pageSize, data: filteredCustomers }
  }
}
