import { Injectable } from '@nestjs/common'
import { ICreateCustomerParams } from 'src/api/customer/ICreateCustomer'

@Injectable()
export default class CustomerService {
  async create(customer: ICreateCustomerParams) {
    return customer
  }
}
