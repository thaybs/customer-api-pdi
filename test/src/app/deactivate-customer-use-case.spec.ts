import { Model } from 'mongoose'
import { idMockCustomer, mockCustomer } from '../infra/customer/customer.mock'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import { NotFoundException } from '@nestjs/common'
import { DeactivateCustomerUseCase } from 'src/app/customer/deactivate-customer-use-case'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

describe('DeactivateCustomerUseCase', () => {
  let deactivateCustomerUseCase: DeactivateCustomerUseCase
  let customerRepository: CustomerRepository

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      update: jest.fn(),
      findOneByField: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerRepository = new CustomerRepository(customerModel)

    deactivateCustomerUseCase = new DeactivateCustomerUseCase(customerRepository)
  })

  it('should deactivate a customer', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(customerRepository, 'update').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await deactivateCustomerUseCase.execute(idMockCustomer)

    expect(customerRepository.findOne).toBeCalled()
    expect(customerRepository.update).toBeCalled()
    expect(customer).toBeUndefined()
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(null)

    try {
      await deactivateCustomerUseCase.execute(idMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
