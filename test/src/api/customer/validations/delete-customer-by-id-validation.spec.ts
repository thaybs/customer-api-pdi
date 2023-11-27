import 'reflect-metadata'

import { validate } from 'class-validator'
import { DeleteCustomerByIdValidation } from 'src/api/customer/dto/delete-customer-by-id-dto'

describe('DeleteCustomerByIdValidation', () => {
  it('should not accept invalid data', async () => {
    const customer = new DeleteCustomerByIdValidation()
    customer.id = 'A'

    const errors = await validate(customer)
    expect(errors.length).toEqual(1)
  })

  it('should accept valid data', async () => {
    const customer = new DeleteCustomerByIdValidation()
    customer.id = '269cee59-63ce-4264-ac7b-99f43b4ad960'

    const errors = await validate(customer)
    expect(errors.length).toEqual(0)
  })
})
