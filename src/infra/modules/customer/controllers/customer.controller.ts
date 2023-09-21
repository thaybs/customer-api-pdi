import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ICreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { ICustomer } from 'src/domain/ICustomer'
import CustomerService from 'src/infra/modules/customer/services/customer.service'

@Controller('customers')
export class CustomerController {
  private customers = []

  @Post()
  async create(@Body() params: ICreateCustomerParams): Promise<ICustomer> {
    return
  }
}
