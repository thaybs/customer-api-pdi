import { Injectable, NotFoundException } from '@nestjs/common'
import { DeleteCustomerByIdValidation } from 'src/api/customer/dto/delete-customer-by-id-dto'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class DeleteCustomerByIdUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(params: DeleteCustomerByIdValidation): Promise<void> {
    const customer = await this.mongooseRepository.findOne({ id: params.id })
    if (!customer) throw new NotFoundException('Customer not found!')

    await this.mongooseRepository.delete(params.id)
  }
}
