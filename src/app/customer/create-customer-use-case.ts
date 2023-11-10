import { Injectable, PreconditionFailedException } from '@nestjs/common'
import { CreateCustomerDto, CreateCustomerResponse } from 'src/api/customer/create-customer-dto'
import { CreateCustomerValidation } from 'src/api/customer/validations/create-customer-validation'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

@Injectable()
export class CreateCustomerUseCase {
  constructor(private mongooseRepository: MongooseRepository<CustomerDocument>) {}

  async execute(params: CreateCustomerDto): Promise<CreateCustomerResponse> {
    const existingCustomer = await this.mongooseRepository.findOneByField('email', params.email)
    if (existingCustomer) throw new PreconditionFailedException('Email already exists!')

    const customer = await this.mongooseRepository.create(params)

    return customer
  }
}
