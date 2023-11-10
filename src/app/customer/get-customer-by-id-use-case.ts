import { Injectable, NotFoundException } from '@nestjs/common'
import { GetCustomerByIdDto, GetCustomerByIdResponse } from 'src/api/customer/get-customer-by-id-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class GetCustomerByIdUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(params: GetCustomerByIdDto): Promise<GetCustomerByIdResponse> {
    const customer = await this.mongooseRepository.findOne(params)
    if (!customer) throw new NotFoundException('Customer not found!')

    return customer
  }
}
