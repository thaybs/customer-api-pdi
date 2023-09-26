import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { ICreateCustomerParams, ICreateCustomerResponse } from 'src/api/customer/ICreateCustomer'
import { ICustomer } from 'src/domain/Customer'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'

@Injectable()
export default class CustomerService {
  constructor(@Inject(CUSTOMER_MODEL) private readonly customerModel: Model<ICustomer>) {}

  async findAll(): Promise<ICustomer[]> {
    return this.customerModel.find().exec()
  }

  async create(params: ICreateCustomerParams) {
    const createdCustomer = new this.customerModel(params)
    return createdCustomer.save()
  }
}
