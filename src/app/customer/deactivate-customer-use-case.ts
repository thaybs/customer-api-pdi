import { Injectable, NotFoundException } from '@nestjs/common'
import { DeactivateCustomerValidation } from 'src/api/customer/dto/deactivate-customer-by-id-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class DeactivateCustomerUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(id: string, params: DeactivateCustomerValidation): Promise<void> {
    const customer = await this.mongooseRepository.findOne({ id })
    if (!customer) throw new NotFoundException('Customer not found!')

    customer.active = params.active

    await this.mongooseRepository.update(id, customer)
  }
}
