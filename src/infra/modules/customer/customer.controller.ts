import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata, Patch, Query } from '@nestjs/common'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/list-customer-dto'
import { CreateCustomerValidation } from 'src/api/customer/validations/create-customer-validation'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { Customer } from 'src/domain/customer/entities/Customer'
import { RolesGuard } from 'src/infra/auth/roles.guard.auth'

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase, private listCustomerUseCase: ListCustomerUseCase) {}

  @Get()
  @SetMetadata('roles', ['user'])
  async findAll(@Query() query: ListCustomerDto): Promise<ListCustomerResponse> {
    return this.listCustomerUseCase.execute(query)
  }

  @Post()
  @SetMetadata('roles', ['user'])
  create(@Body() customer: CreateCustomerValidation): Promise<Customer> {
    return this.createCustomerUseCase.execute(customer)
  }
}
