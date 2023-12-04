import { Address } from './Address'

export class Customer {
  id: string
  name: string
  document: string
  email: string
  phone: string
  address: Address
  active: boolean = true
  createdAt?: Date = new Date()
  updatedAt?: Date | null
}
