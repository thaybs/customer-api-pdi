import { Customer } from 'src/domain/customer/entities/Customer'
import { IPaginate, IPagination } from 'src/infra/crosscutting/interfaces/IPagination'

export type ListCustomerDto = IPagination<{ name?: string; document?: string }>

export type ListCustomerResponse = IPaginate<Customer>
