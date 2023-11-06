import { Address } from './Address'

export class Customer {
  id: string
  name: string
  document: string
  email: string
  phone: string
  address: Address
  active: boolean = true
  updatedAt?: Date = new Date()
  createdAt?: Date = new Date()
  deletedAt?: Date | null
}
