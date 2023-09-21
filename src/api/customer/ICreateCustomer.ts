import { ICustomer } from 'src/domain/ICustomer'

export type ICreateCustomerParams = {
  name: string
  description?: string
  active: boolean
}

export type ICreateCustomerResponse = ICustomer
