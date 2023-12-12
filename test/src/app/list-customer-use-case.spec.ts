import { Model } from 'mongoose'
import { CustomerDocument } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { mockCustomer } from '../infra/customer/customer.mock'
import CustomerRepository from 'src/infra/modules/customer/customer.repository'

describe('ListCustomerUseCase', () => {
  let listCustomerUseCase: ListCustomerUseCase
  let customerRepository: CustomerRepository
  let customerModel: Model<CustomerDocument>

  beforeEach(() => {
    customerModel = {
      findAllWithPaginationAndFilters: jest.fn(),
      findAllByNamePartialMatch: jest.fn(),
    } as unknown as Model<CustomerDocument>

    customerRepository = new CustomerRepository(customerModel)

    listCustomerUseCase = new ListCustomerUseCase(customerRepository)
  })

  it('should return a list of customers with NO filters', async () => {
    const mockCustomers = [mockCustomer as CustomerDocument]
    jest.spyOn(customerRepository, 'findAllWithPaginationAndFilters').mockResolvedValue(mockCustomers)

    const params = { page: 1, pageSize: 10, name: '', document: '', active: false }
    const result = await listCustomerUseCase.execute(params)

    expect(customerRepository.findAllWithPaginationAndFilters).toHaveBeenCalledWith(
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
      .spyOn(customerRepository, 'findAllWithPaginationAndFilters')
      .mockResolvedValue(mockCustomers)

    const params = { page: 1, pageSize: 10, name: 'João', document: '', active: true }
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
    const findAllMock = jest.spyOn(customerRepository, 'findAllWithPaginationAndFilters').mockResolvedValue([])

    const params = { page: 1, pageSize: 10, name: '', document: '', active: true }
    const result = await listCustomerUseCase.execute(params)

    expect(findAllMock).toHaveBeenCalledWith(expect.objectContaining({}), params.page, params.pageSize)

    expect(result.page).toBe(params.page)
    expect(result.pageSize).toBe(params.pageSize)
    expect(result.data).toStrictEqual([])
  })
})
