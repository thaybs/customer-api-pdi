import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata, Patch, Query } from '@nestjs/common'
import { CreateCustomerResponse } from 'src/api/customer/create-customer-dto'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/list-customer-dto'
import { CreateCustomerValidation } from 'src/api/customer/validations/create-customer-validation'
import { GetCustomerByIdValidation } from 'src/api/customer/validations/get-customer-by-id-validation'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { GetCustomerByIdUseCase } from 'src/app/customer/get-customer-by-id-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { RolesGuard } from 'src/infra/auth/roles.guard.auth'

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private listCustomerUseCase: ListCustomerUseCase,
    private getCustomerByIdUseCase: GetCustomerByIdUseCase,
  ) {}

  @Get()
  @SetMetadata('roles', ['user'])
  findAll(@Query() query: ListCustomerDto): Promise<ListCustomerResponse> {
    return this.listCustomerUseCase.execute(query)
  }

  @Post()
  @SetMetadata('roles', ['user'])
  create(@Body() params: CreateCustomerValidation): Promise<CreateCustomerResponse> {
    return this.createCustomerUseCase.execute(params)
  }

  @Get(':id')
  @SetMetadata('roles', ['user'])
  getById(@Param() params: GetCustomerByIdValidation): Promise<GetCustomerByIdValidation> {
    return this.getCustomerByIdUseCase.execute(params)
  }
}
