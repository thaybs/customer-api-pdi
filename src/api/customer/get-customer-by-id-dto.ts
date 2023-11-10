import { Customer } from 'src/domain/customer/entities/Customer'

export type GetCustomerByIdDto = {
  id: string
}

export type GetCustomerByIdResponse = Customer
