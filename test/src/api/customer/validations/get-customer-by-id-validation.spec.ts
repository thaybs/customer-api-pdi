import 'reflect-metadata'

import { validate } from 'class-validator'
import { CreateCustomerValidation } from 'src/api/customer/validations/create-customer-validation'
import { GetCustomerByIdValidation } from 'src/api/customer/validations/get-customer-by-id-validation'

describe('GetCustomerByIdValidation', () => {
  it('should not accept invalid data', async () => {
    const customer = new GetCustomerByIdValidation()
    customer.id = 'A'

    const errors = await validate(customer)
    expect(errors.length).toEqual(1)
  })

  it('should accept valid data', async () => {
    const customer = new GetCustomerByIdValidation()
    customer.id = '269cee59-63ce-4264-ac7b-99f43b4ad960'

    const errors = await validate(customer)
    expect(errors.length).toEqual(0)
  })
})
