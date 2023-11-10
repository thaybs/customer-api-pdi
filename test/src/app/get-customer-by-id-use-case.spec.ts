import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'
import { GetCustomerByIdUseCase } from 'src/app/customer/get-customer-by-id-use-case'
import { getMockCustomerById, mockCustomer } from '../customer.mock'
import { NotFoundException } from '@nestjs/common'

describe('GetCustomerByIdUseCase', () => {
  let getCustomerByIdUseCase: GetCustomerByIdUseCase
  let mongooseRepository: MongooseRepository<CustomerDocument>

  beforeEach(() => {
    const customerModel: Model<CustomerDocument> = {
      findOne: jest.fn(),
    } as unknown as Model<CustomerDocument>

    mongooseRepository = new MongooseRepository(customerModel)

    getCustomerByIdUseCase = new GetCustomerByIdUseCase(mongooseRepository)
  })

  it('should get a customer by its id', async () => {
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(mockCustomer as CustomerDocument)

    const customer = await getCustomerByIdUseCase.execute(getMockCustomerById)

    expect(mongooseRepository.findOne).toBeCalled()
    expect(customer).toBe(mockCustomer)
  })

  it('should throw an error if the customer was not found', async () => {
    jest.spyOn(mongooseRepository, 'findOne').mockResolvedValue(null)

    try {
      await getCustomerByIdUseCase.execute(getMockCustomerById)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Customer not found!')
    }
  })
})
