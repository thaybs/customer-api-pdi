import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ICreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { ICustomer } from 'src/domain/Customer'
import CustomerService from 'src/infra/modules/customer/customer.service'

@Controller('customers')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @Get()
  async findAll(): Promise<ICustomer[]> {
    return this.service.findAll()
  }

  @Post()
  create(@Body() customer: ICreateCustomerParams): Promise<ICustomer> {
    return this.service.create(customer)
  }

  @Delete('id')
  async delete(@Param() customer: ICustomer): Promise<void> {
    await this.service.deleteById(customer)
  }
}
