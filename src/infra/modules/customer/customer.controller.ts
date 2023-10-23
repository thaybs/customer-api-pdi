import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common'
import { ICreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { RolesGuard } from 'src/auth/roles.guard.auth'
import { ICustomer } from 'src/domain/Customer'
import CustomerService from 'src/infra/modules/customer/customer.service'

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(private service: CustomerService, private createCustomerUseCase: CreateCustomerUseCase) {}

  @Get()
  @SetMetadata('roles', ['admin', 'user'])
  async findAll(): Promise<ICustomer[]> {
    return this.service.findAll()
  }

  @Post()
  @SetMetadata('roles', ['admin', 'user'])
  create(@Body() customer: ICreateCustomerParams): Promise<ICustomer> {
    return this.createCustomerUseCase.execute(customer)
  }

  @Delete('id')
  @SetMetadata('roles', ['admin', 'user'])
  async delete(@Param() customer: ICustomer): Promise<void> {
    await this.service.deleteById(customer)
  }
}
