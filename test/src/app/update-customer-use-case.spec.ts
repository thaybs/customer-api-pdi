import { Model } from 'mongoose'
import { mockCustomer, updateMockCustomer } from '../infra/customer/customer.mock'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import { UpdateCustomerUseCase } from 'src/app/customer/update-customer-use-case '
import { NotFoundException, PreconditionFailedException } from '@nestjs/common'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

describe('UpdateCustomerUseCase', () => {
  let updateCustomerUseCase: UpdateCustomerUseCase
  let customerRepository: CustomerRepository

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      update: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerRepository = new CustomerRepository(customerModel)

    updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)
  })

  it('should update a customer', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(customerRepository, 'update').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await updateCustomerUseCase.execute(mockCustomer.id, updateMockCustomer)

    expect(customerRepository.update).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the e-mail exists', async () => {
    const existingCustomerWithSameEmail = {
      ...mockCustomer,
      id: '3aececc7-6d34-4ef2-b817-52cf0bdb217c',
    }

    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(existingCustomerWithSameEmail as CustomerDocument)
    jest.spyOn(customerRepository, 'update').mockResolvedValue(mockCustomer as CustomerDocument)

    try {
      await updateCustomerUseCase.execute(mockCustomer.id, updateMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(PreconditionFailedException)
      expect(error.message).toBe('Email already exists for another customer!')
    }

    expect(customerRepository.update).not.toBeCalled()
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(null)

    try {
      await updateCustomerUseCase.execute(mockCustomer.id, updateMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
