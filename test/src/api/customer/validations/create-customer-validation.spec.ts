import 'reflect-metadata'

import { validate } from 'class-validator'
import { CreateCustomerValidation } from 'src/api/customer/dto/create-customer-dto'

describe('CreateCustomerValidation', () => {
  it('should not accept invalid data', async () => {
    const customer = new CreateCustomerValidation()
    customer.name = 'A'
    customer.document = '1234567890'
    customer.email = 'abc.com'
    customer.phone = '123456789'

    const errors = await validate(customer)
    expect(errors.length).toEqual(4)
  })

  it('should accept valid data', async () => {
    const customer = new CreateCustomerValidation()
    customer.name = 'John Doe'
    customer.document = '13094271863'
    customer.email = 'john.doe@example.com'
    customer.phone = '123456-7890'

    const errors = await validate(customer)
    console.log(errors)
    expect(errors.length).toEqual(0)
  })
})
