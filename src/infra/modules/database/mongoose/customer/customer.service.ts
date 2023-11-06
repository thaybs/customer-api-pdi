import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Customer } from 'src/domain/customer/entities/Customer'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'
import { CustomerDocument } from './schema/customer.schema'
import { CreateCustomerDto } from 'src/api/customer/create-customer-dto'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/list-customer-dto'

@Injectable()
export class CustomerService {
  constructor(@Inject(CUSTOMER_MODEL) private readonly customerModel: Model<CustomerDocument>) {}

  async createCustomer(params: CreateCustomerDto): Promise<Customer> {
    const customer = new this.customerModel(params)
    const savedCustomer = await customer.save()

    return savedCustomer
  }

  async findAllCustomers(): Promise<Customer[]> {
    return this.customerModel.find().exec()
  }

  async findCustomerByEmail(email: string): Promise<Customer | null> {
    return this.customerModel.findOne({ email }).exec()
  }

  async findCustomersWithPagination(params: ListCustomerDto): Promise<ListCustomerResponse> {
    const { page, pageSize } = params
    const skip = (page - 1) * pageSize

    let query: any = {}

    const customers = await this.customerModel.find(query).skip(skip).limit(pageSize).exec()

    return { page, pageSize, data: customers }
  }
}
