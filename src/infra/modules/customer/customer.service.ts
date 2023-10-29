import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Customer } from 'src/domain/Customer'
import { CustomerDocument } from 'src/infra/modules/customer/customer.model'
import { CreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'

@Injectable()
export class CustomerService {
  constructor(@Inject(CUSTOMER_MODEL) private readonly customerModel: Model<CustomerDocument>) {}

  async createCustomer(params: CreateCustomerParams): Promise<Customer> {
    const customer = new this.customerModel(params)
    const savedCustomer = await customer.save()

    return savedCustomer.toObject()
  }

  async findAllCustomer(): Promise<Customer[]> {
    return this.customerModel.find().exec()
  }
}
