import { Injectable } from '@nestjs/common'
import { FilterQuery, Model } from 'mongoose'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/list-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class ListCustomerUseCase {
  constructor(
    private mongooseRepository: MongooseRepository<CustomerDocument>,
    private readonly model: Model<CustomerDocument>,
  ) {}

  async execute(params: ListCustomerDto): Promise<ListCustomerResponse> {
    const { filter, page, pageSize } = params

    let filteredCustomers: Customer[]

    if (filter && filter.name) {
      filteredCustomers = await this.findAllByNamePartialMatch(params)
    } else {
      filteredCustomers = await this.mongooseRepository.findAllWithPaginationAndFilters(filter, page, pageSize)
    }

    return { page, pageSize, data: filteredCustomers }
  }

  async findAllByNamePartialMatch(params: ListCustomerDto): Promise<Customer[]> {
    const { filter, page, pageSize } = params

    const skip = (page - 1) * pageSize
    const query = { name: { $regex: filter?.name, $options: 'i' }, document: filter?.document }

    return this.model.find(query).skip(skip).limit(pageSize).exec()
  }
}
