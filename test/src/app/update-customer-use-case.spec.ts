import { Model } from 'mongoose'
import { mockCustomer, updateMockCustomer } from '../infra/customer/customer.mock'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'
import { UpdateCustomerUseCase } from 'src/app/customer/update-customer-use-case '
import { NotFoundException, PreconditionFailedException } from '@nestjs/common'

describe('UpdateCustomerUseCase', () => {
  let updateCustomerUseCase: UpdateCustomerUseCase
  let mongooseRepository: MongooseRepository<CustomerDocument>

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      update: jest.fn(),
      findOneByField: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Model<CustomerDocument>

    mongooseRepository = new MongooseRepository(customerModel)

    updateCustomerUseCase = new UpdateCustomerUseCase(mongooseRepository)
  })

  it('should update a customer', async () => {
    jest.spyOn(mongooseRepository, 'findOneByField').mockResolvedValue(null)
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(mongooseRepository, 'update').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await updateCustomerUseCase.execute(mockCustomer.id, updateMockCustomer)

    expect(mongooseRepository.update).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the e-mail exists', async () => {
    const existingCustomerWithSameEmail = {
      ...mockCustomer,
      id: '3aececc7-6d34-4ef2-b817-52cf0bdb217c',
    }

    jest
      .spyOn(mongooseRepository, 'findOneByField')
      .mockResolvedValue(existingCustomerWithSameEmail as CustomerDocument)
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)

    jest.spyOn(mongooseRepository, 'update').mockResolvedValue(mockCustomer as CustomerDocument)

    try {
      await updateCustomerUseCase.execute(mockCustomer.id, updateMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(PreconditionFailedException)
      expect(error.message).toBe('Email already exists for another customer!')
    }

    expect(mongooseRepository.update).not.toBeCalled()
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(null)

    try {
      await updateCustomerUseCase.execute(mockCustomer.id, updateMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
