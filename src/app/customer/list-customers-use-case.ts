import { Injectable } from '@nestjs/common'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/list-customer-dto'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class ListCustomerUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(params: ListCustomerDto): Promise<any> {
    const { filter, page, pageSize } = params

    const customers = await this.mongooseRepository.findAllWithPaginationAndFilters(filter, page, pageSize)
    return customers
  }
}
