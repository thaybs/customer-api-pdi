import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  HttpCode,
  Query,
  Put,
  Patch,
} from '@nestjs/common'
import { CreateCustomerValidation } from 'src/api/customer/dto/create-customer-dto'
import { DeactivateCustomerValidation } from 'src/api/customer/dto/deactivate-customer-by-id-dto'
import { DeleteCustomerByIdValidation } from 'src/api/customer/dto/delete-customer-by-id-dto'
import { GetCustomerByIdValidation } from 'src/api/customer/dto/get-customer-by-id-dto'
import { ListCustomerDto, ListCustomerResponse } from 'src/api/customer/dto/list-customer-dto'
import { UpdateCustomerValidation } from 'src/api/customer/dto/update-customer-dto'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { DeactivateCustomerUseCase } from 'src/app/customer/deactivate-customer-use-case'
import { DeleteCustomerByIdUseCase } from 'src/app/customer/delete-customer-by-id-use-case'
import { GetCustomerByIdUseCase } from 'src/app/customer/get-customer-by-id-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { UpdateCustomerUseCase } from 'src/app/customer/update-customer-use-case '
import { Customer } from 'src/domain/customer/entities/Customer'
import { RolesGuard } from 'src/infra/auth/roles.guard.auth'

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private listCustomerUseCase: ListCustomerUseCase,
    private getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private updateCustomerUseCase: UpdateCustomerUseCase,
    private deactivateCustomerUseCase: DeactivateCustomerUseCase,
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

  @Put(':id')
  @SetMetadata('roles', ['user'])
  async update(@Param('id') id: string, @Body() params: UpdateCustomerValidation): Promise<Customer> {
    return this.updateCustomerUseCase.execute(id, params)
  }

  @Patch(':id')
  @SetMetadata('roles', ['user'])
  @HttpCode(204)
  async deactivate(@Param('id') id: string, @Body() params: DeactivateCustomerValidation): Promise<void> {
    return this.deactivateCustomerUseCase.execute(id, params)
  }

  @Delete(':id')
  @HttpCode(204)
  @SetMetadata('roles', ['user'])
  async delete(@Param() params: DeleteCustomerByIdValidation): Promise<void> {
    await this.deleteCustomerByIdUseCase.execute(params)
  }
}
