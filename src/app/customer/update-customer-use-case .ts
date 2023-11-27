import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common'
import { UpdateCustomerValidation } from 'src/api/customer/dto/update-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(id: string, params: UpdateCustomerValidation): Promise<Customer> {
    const customer = await this.mongooseRepository.findOne({ id })
    if (!customer) throw new NotFoundException('Customer not found!')

    const existingEmailCustomer = await this.mongooseRepository.findOneByField('email', params.email)
    if (existingEmailCustomer && existingEmailCustomer.id !== id) {
      throw new PreconditionFailedException('Email already exists for another customer!')
    }

    const updatedCustomer = await this.mongooseRepository.update(id, params)

    updatedCustomer.updatedAt = new Date()

    return updatedCustomer
  }
}
