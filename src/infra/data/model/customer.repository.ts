import { Model } from 'mongoose'
import { ListCustomerDto } from 'src/api/customer/dto/list-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'

export class CustomerRepository {
  constructor(private readonly model: Model<CustomerDocument>) {}

  async findAllByNamePartialMatch(params: ListCustomerDto): Promise<Customer[]> {
    const { filter, page, pageSize } = params

    const skip = (page - 1) * pageSize
    const query = { name: filter?.name, document: filter?.document }

    return this.model.find(query).skip(skip).limit(pageSize).exec()
  }
}
