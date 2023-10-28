import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata, Patch } from '@nestjs/common'
import { CreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { RolesGuard } from 'src/auth/roles.guard.auth'
import { Customer } from 'src/domain/Customer'

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase, private listCustomerUseCase: ListCustomerUseCase) {}

  @Get()
  @SetMetadata('roles', ['user'])
  async findAll(): Promise<Customer[]> {
    return this.listCustomerUseCase.execute()
  }

  @Post()
  @SetMetadata('roles', ['user'])
  create(@Body() customer: CreateCustomerParams): Promise<Customer> {
    return this.createCustomerUseCase.execute(customer)
  }
}
