import { Model } from 'mongoose'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { mockCustomer, createMockCustomer } from '../infra/customer/customer.mock'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCase
  let mongooseRepository: MongooseRepository<CustomerDocument>

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      create: jest.fn(),
    } as unknown as Model<CustomerDocument>

    mongooseRepository = new MongooseRepository(customerModel)

    createCustomerUseCase = new CreateCustomerUseCase(mongooseRepository)
  })

  it('should create a customer', async () => {
    jest.spyOn(mongooseRepository, 'findOneByField').mockResolvedValue(null)
    jest.spyOn(mongooseRepository, 'create').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await createCustomerUseCase.execute(createMockCustomer)

    expect(mongooseRepository.create).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the e-mail exists', async () => {
    jest.spyOn(mongooseRepository, 'findOneByField').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(mongooseRepository, 'create').mockResolvedValue(mockCustomer as CustomerDocument)

    try {
      await createCustomerUseCase.execute(createMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Email already exists!')
    }

    expect(mongooseRepository.create).not.toBeCalled()
  })
})
