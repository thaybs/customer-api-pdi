import { DeleteCustomerByIdUseCase } from 'src/app/customer/delete-customer-by-id-use-case'
import { NotFoundException } from '@nestjs/common'
import { mockCustomer, idMockCustomer } from '../infra/customer/customer.mock'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'
import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'

describe('DeleteCustomerByIdUseCase', () => {
  let deleteCustomerByIdUseCase: DeleteCustomerByIdUseCase
  let customerRepository: CustomerRepository

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      findOne: jest.fn(),
      delete: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerRepository = new CustomerRepository(customerModel)

    deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(customerRepository)
  })

  it('should delete a customer by its id', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(customerRepository, 'delete').mockResolvedValue()

    const customer = await deleteCustomerByIdUseCase.execute(idMockCustomer)

    expect(customerRepository.findOne).toBeCalled()
    expect(customer).toBeUndefined()
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(null)

    try {
      await deleteCustomerByIdUseCase.execute(idMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
