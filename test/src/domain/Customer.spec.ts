import 'reflect-metadata'

import { validate } from 'class-validator'
import { Customer } from 'src/domain/Customer'

describe('Customer', () => {
  it('should not accept invalid data', async () => {
    const customer = new Customer()
    customer.id = '123e4567-e89b-12d3-a456-426614174000'
    customer.name = 'A'
    customer.document = '1234567890'
    customer.email = 'abc.com'
    customer.phone = '1234567890'
    customer.active = true
    customer.createdAt = new Date()

    const errors = await validate(customer)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('should accept valid data', async () => {
    const customer = new Customer()
    customer.id = '123e4567-e89b-12d3-a456-426614174000'
    customer.name = 'John Doe'
    customer.document = '12345678910'
    customer.email = 'john.doe@example.com'
    customer.phone = '123456-7890'
    customer.active = true
    customer.createdAt = new Date()
    customer.deletedAt = new Date()
    customer.updatedAt = new Date()

    const errors = await validate(customer)
    expect(errors.length).toEqual(0)
  })
})
