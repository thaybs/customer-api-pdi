import { Customer } from 'src/domain/customer/entities/Customer'
import { IPaginate, IPagination } from 'src/infra/crosscutting/interfaces/IPagination'

export interface ListCustomerDto extends IPagination {
  name: string
  document: string
  active: boolean
}

export type ListCustomerResponse = IPaginate<Customer>
