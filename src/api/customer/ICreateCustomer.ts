import { Customer } from 'src/domain/Customer'
import { OmitType } from '@nestjs/mapped-types'

export class CreateCustomerParams extends OmitType(Customer, ['id', 'createdAt', 'deletedAt'] as const) {}

export type CreateCustomerResponse = Customer
