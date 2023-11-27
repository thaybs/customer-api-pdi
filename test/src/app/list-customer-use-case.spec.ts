import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { mockCustomer } from '../infra/customer/customer.mock'
import { CustomerRepository } from 'src/infra/data/model/customer.repository'

describe('ListCustomerUseCase', () => {
  let listCustomerUseCase: ListCustomerUseCase
  let mongooseRepository: MongooseRepository<CustomerDocument>
  let customerModel: Model<CustomerDocument>
  let customerRepository: CustomerRepository
  beforeEach(() => {
    customerModel = {
      findAllWithPaginationAndFilters: jest.fn(),
      findAllByNamePartialMatch: jest.fn(),
    } as unknown as Model<CustomerDocument>

    mongooseRepository = new MongooseRepository(customerModel)

    listCustomerUseCase = new ListCustomerUseCase(mongooseRepository, customerRepository)
  })

  it('should return a list of customers with NO filters', async () => {
    const mockCustomers = [mockCustomer as CustomerDocument]
    jest.spyOn(mongooseRepository, 'findAllWithPaginationAndFilters').mockResolvedValue(mockCustomers)

    const params = { page: 1, pageSize: 10, filter: {} }
    const result = await listCustomerUseCase.execute(params)

    expect(mongooseRepository.findAllWithPaginationAndFilters).toHaveBeenCalledWith(
      params.filter,
      params.page,
      params.pageSize,
    )
    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toBe(mockCustomers)
  })

  it('should return a list of customers with filters', async () => {
    const mockCustomers = [mockCustomer]

    jest.spyOn(customerRepository, 'findAllByNamePartialMatch').mockResolvedValueOnce(mockCustomers)

    const params = { page: 1, pageSize: 10, filter: { name: '', document: '' } }
    const result = await listCustomerUseCase.execute(params)

    expect(customerRepository.findAllByNamePartialMatch).toHaveBeenCalledWith(params)

    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toEqual(mockCustomers)
  })

  it('should return an empty list when no customers are found', async () => {
    const mockCustomers = [mockCustomer as CustomerDocument]
    jest.spyOn(mongooseRepository, 'findAllWithPaginationAndFilters').mockResolvedValue([])

    const params = { page: 1, pageSize: 10, filter: {} }
    const result = await listCustomerUseCase.execute(params)

    expect(mongooseRepository.findAllWithPaginationAndFilters).toHaveBeenCalledWith(
      params.filter,
      params.page,
      params.pageSize,
    )
    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toStrictEqual([])
  })
})
