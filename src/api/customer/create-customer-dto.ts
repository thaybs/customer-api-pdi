import { OmitType } from '@nestjs/mapped-types'
import { Customer } from 'src/domain/customer/entities/Customer'

export class CreateCustomerDto extends OmitType(Customer, [
  'id',
  'active',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
