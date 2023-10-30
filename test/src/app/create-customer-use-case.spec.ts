import { Model } from 'mongoose'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { CustomerDocument } from 'src/infra/modules/customer/schemas/customer.model'
import { CustomerService } from 'src/infra/modules/customer/customer.service'
import { mockCustomer, createMockCustomer } from '../infra/customer/customer.mock'

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
    jest.spyOn(customerService, 'createCustomer').mockResolvedValue(mockCustomer)

    const customer = await createCustomerUseCase.execute(createMockCustomer)

    expect(customerService.createCustomer).toBeCalled()
    expect(customer).toBeDefined()
    expect(customer.name).toBe(createMockCustomer.name)
    expect(customer.document).toBe(createMockCustomer.document)
    expect(customer.email).toBe(createMockCustomer.email)
    expect(customer.phone).toBe(createMockCustomer.phone)
    expect(customer.active).toBe(createMockCustomer.active)
    expect(customer.address).toBe(createMockCustomer.address)
    expect(customer.address.city).toBe(createMockCustomer.address.city)
    expect(customer.address.street).toBe(createMockCustomer.address.street)
    expect(customer.address.number).toBe(createMockCustomer.address.number)
    expect(customer.address.neighborhood).toBe(createMockCustomer.address.neighborhood)
    expect(customer.address.postalCode).toBe(createMockCustomer.address.postalCode)
  })
})
