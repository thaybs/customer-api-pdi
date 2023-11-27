import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata, Query } from '@nestjs/common'
import { CreateCustomerValidation } from 'src/api/customer/dto/create-customer-dto'
import { DeleteCustomerByIdValidation } from 'src/api/customer/dto/delete-customer-by-id-dto'
import { GetCustomerByIdValidation } from 'src/api/customer/dto/get-customer-by-id-dto'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/dto/list-customer-dto'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { DeleteCustomerByIdUseCase } from 'src/app/customer/delete-customer-by-id-use-case'
import { GetCustomerByIdUseCase } from 'src/app/customer/get-customer-by-id-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { Customer } from 'src/domain/customer/entities/Customer'
import { RolesGuard } from 'src/infra/auth/roles.guard.auth'

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private listCustomerUseCase: ListCustomerUseCase,
    private getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private deleteCustomerByIdUseCase: DeleteCustomerByIdUseCase,
  ) {}

  @Get()
  @SetMetadata('roles', ['user'])
  findAll(@Query() query: ListCustomerDto): Promise<ListCustomerResponse> {
    return this.listCustomerUseCase.execute(query)
  }

  @Post()
  @SetMetadata('roles', ['user'])
  create(@Body() params: CreateCustomerValidation): Promise<Customer> {
    return this.createCustomerUseCase.execute(params)
  }

  @Get(':id')
  @SetMetadata('roles', ['user'])
  getById(@Param() params: GetCustomerByIdValidation): Promise<Customer> {
    return this.getCustomerByIdUseCase.execute(params)
  }

  @Delete(':id')
  @SetMetadata('roles', ['user'])
  async delete(@Param() params: DeleteCustomerByIdValidation): Promise<void> {
    await this.deleteCustomerByIdUseCase.execute(params)
  }
}
