import { ApiProperty } from '@nestjs/swagger'
import { Address } from './Address'

export class Customer {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  document: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phone: string

  @ApiProperty({ type: Address })
  address: Address

  @ApiProperty()
  active: boolean = true

  @ApiProperty()
  createdAt?: Date = new Date()

  @ApiProperty()
  updatedAt?: Date | null

  static create(params: Partial<Customer>): Customer {
    const customer = new Customer()

    customer.name = params.name
    customer.email = params.email
    customer.phone = params.phone
    customer.document = params.document
    customer.address = params.address
    customer.active = true
    customer.createdAt = new Date()
    customer.updatedAt = new Date()

    return customer
  }

  static update(name: string, email: string, phone: string, address: Address): Customer {
    const updatedCustomer = new Customer()

    updatedCustomer.name = name
    updatedCustomer.email = email
    updatedCustomer.phone = phone
    updatedCustomer.address = address
    updatedCustomer.updatedAt = new Date()

    return updatedCustomer
  }

  static deactivate(customer: Customer): void {
    customer.active = false
    customer.updatedAt = new Date()
  }
}
