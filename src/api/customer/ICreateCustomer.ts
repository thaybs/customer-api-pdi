import { IAddress, ICustomer } from 'src/domain/Customer'

export type ICreateCustomerParams = {
  name: string
  description?: string
  active: boolean
  address?: IAddress
}

export type ICreateCustomerResponse = ICustomer
