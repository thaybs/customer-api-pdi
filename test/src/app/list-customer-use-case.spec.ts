import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { mockCustomer } from '../infra/customer/customer.mock'

describe('ListCustomerUseCase', () => {
  let listCustomerUseCase: ListCustomerUseCase
  let mongooseRepository: MongooseRepository<CustomerDocument>
  let customerModel: Model<CustomerDocument>

  beforeEach(() => {
    customerModel = {
      findAllWithPaginationAndFilters: jest.fn(),
      findAllByNamePartialMatch: jest.fn(),
    } as unknown as Model<CustomerDocument>

    mongooseRepository = new MongooseRepository(customerModel)

    listCustomerUseCase = new ListCustomerUseCase(mongooseRepository)
  })

  it('should return a list of customers with NO filters', async () => {
    const mockCustomers = [mockCustomer as CustomerDocument]
    jest.spyOn(mongooseRepository, 'findAllWithPaginationAndFilters').mockResolvedValue(mockCustomers)

    const params = { page: 1, pageSize: 10, name: '', document: '' }
    const result = await listCustomerUseCase.execute(params)

    expect(mongooseRepository.findAllWithPaginationAndFilters).toHaveBeenCalledWith(
      expect.objectContaining({}),
      params.page,
      params.pageSize,
    )
    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toBe(mockCustomers)
  })

  it('should return a list of customers with filters', async () => {
    const mockCustomers = [mockCustomer as CustomerDocument]
    const findAllMock = jest
      .spyOn(mongooseRepository, 'findAllWithPaginationAndFilters')
      .mockResolvedValue(mockCustomers)

    const params = { page: 1, pageSize: 10, name: 'João', document: '' }
    const result = await listCustomerUseCase.execute(params)

    expect(findAllMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: params.name,
        document: params.document,
      }),
      params.page,
      params.pageSize,
    )

    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toEqual(mockCustomers)
  })

  it('should return an empty list when no customers are found', async () => {
    const findAllMock = jest.spyOn(mongooseRepository, 'findAllWithPaginationAndFilters').mockResolvedValue([])

    const params = { page: 1, pageSize: 10, name: '', document: '' }
    const result = await listCustomerUseCase.execute(params)

    expect(findAllMock).toHaveBeenCalledWith(expect.objectContaining({}), params.page, params.pageSize)

    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toStrictEqual([])
  })
})
