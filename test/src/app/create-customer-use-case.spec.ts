import { Model } from 'mongoose'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { mockCustomer, createMockCustomer } from '../infra/customer/customer.mock'
import { CustomerService } from 'src/infra/modules/database/mongoose/customer/customer.service'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCase
  let customerService: CustomerService

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      create: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerService = new CustomerService(customerModel)

    createCustomerUseCase = new CreateCustomerUseCase(customerService)
  })

  it('should create a customer', async () => {
    jest.spyOn(customerService, 'findCustomerByEmail').mockResolvedValue(null)
    jest.spyOn(customerService, 'createCustomer').mockResolvedValue(mockCustomer)

    const customer = await createCustomerUseCase.execute(createMockCustomer)

    expect(customerService.createCustomer).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the e-mail exists', async () => {
    jest.spyOn(customerService, 'findCustomerByEmail').mockResolvedValue(mockCustomer)
    jest.spyOn(customerService, 'createCustomer').mockResolvedValue(mockCustomer)

    try {
      await createCustomerUseCase.execute(createMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Email already exists!')
    }

    expect(customerService.createCustomer).not.toBeCalled()
  })
})
