import { Customer } from 'src/domain/customer/entities/Customer'

export interface ListCustomerDto {
  page: number
  pageSize: number
}

export type ListCustomerResponse = {
  page: number
  pageSize: number
  data: Customer[]
}
