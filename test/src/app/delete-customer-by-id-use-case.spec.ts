import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'
import { DeleteCustomerByIdUseCase } from 'src/app/customer/delete-customer-by-id-use-case'
import { NotFoundException } from '@nestjs/common'
import { mockCustomer, idMockCustomer } from '../infra/customer/customer.mock'

describe('DeleteCustomerByIdUseCase', () => {
  let deleteCustomerByIdUseCase: DeleteCustomerByIdUseCase
  let mongooseRepository: MongooseRepository<CustomerDocument>

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      findOne: jest.fn(),
      delete: jest.fn(),
    } as unknown as Model<CustomerDocument>

    mongooseRepository = new MongooseRepository(customerModel)

    deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(mongooseRepository)
  })

  it('should delete a customer by its id', async () => {
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)
    jest.spyOn(mongooseRepository, 'delete').mockResolvedValue()

    const customer = await deleteCustomerByIdUseCase.execute(idMockCustomer)

    expect(mongooseRepository.findOne).toBeCalled()
    expect(customer).toBeUndefined()
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(null)

    try {
      await deleteCustomerByIdUseCase.execute(idMockCustomer)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
