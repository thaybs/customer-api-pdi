import { Injectable } from '@nestjs/common'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/dto/list-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class ListCustomerUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(params: ListCustomerDto): Promise<ListCustomerResponse> {
    const { name, document, page, pageSize } = params

    let filter = { name, document }

    const customer = await this.mongooseRepository.findAllWithPaginationAndFilters(filter, page, pageSize)

    return { page, pageSize, data: customer }
  }
}
