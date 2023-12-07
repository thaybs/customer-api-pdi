import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import { GetCustomerByIdUseCase } from 'src/app/customer/get-customer-by-id-use-case'
import { NotFoundException } from '@nestjs/common'
import { mockCustomer, idMockCustomer } from '../infra/customer/customer.mock'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

describe('GetCustomerByIdUseCase', () => {
  let getCustomerByIdUseCase: GetCustomerByIdUseCase
  let customerRepository: CustomerRepository

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      findOne: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerRepository = new CustomerRepository(customerModel)

    getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository)
  })

  it('should get a customer by its id', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await getCustomerByIdUseCase.execute(idMockCustomer)

    expect(customerRepository.findOne).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(customerRepository, 'findOne').mockResolvedValue(null)

    try {
      await getCustomerByIdUseCase.execute(idMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
