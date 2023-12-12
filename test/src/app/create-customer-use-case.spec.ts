import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { mockCustomer, createMockCustomer } from '../infra/customer/customer.mock'
import { Model } from 'mongoose'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'

describe('CreateCustomerUseCase', () => {
  // Criar testes restantes
  let createCustomerUseCase: CreateCustomerUseCase
  let customerRepository: CustomerRepository

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      create: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerRepository = new CustomerRepository(customerModel)

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
  })

  it('should create a customer', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(null)
    jest.spyOn(customerRepository, 'create').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await createCustomerUseCase.execute(createMockCustomer)

    expect(customerRepository.create).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the e-mail exists', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(customerRepository, 'create').mockResolvedValue(mockCustomer as CustomerDocument)

    try {
      await createCustomerUseCase.execute(createMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Email already exists!')
    }

    expect(customerRepository.create).not.toBeCalled()
  })
})
