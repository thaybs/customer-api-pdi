import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'
import { createMockCustomer, mockCustomer } from './customer.mock'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { CustomerController } from 'src/infra/modules/customer/customer.controller'
import { customerProviders } from 'src/infra/modules/customer/customer.providers'
import { DatabaseModule } from 'src/infra/modules/database/database.module'
import { Customer } from 'src/domain/customer/entities/Customer'
import { AuthService } from 'src/infra/auth/auth.service'
import { CustomerService } from 'src/infra/modules/database/mongoose/customer/customer.service'

describe('CustomerService', () => {
  let service: CustomerService
  let mockCustomerModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: getModelToken(CUSTOMER_MODEL),
          useValue: {},
        },
        AuthService,
        CreateCustomerUseCase,
        ListCustomerUseCase,
        ...customerProviders,
      ],
    }).compile()

    mockCustomerModel = {
      create: jest.fn().mockResolvedValue(mockCustomer),
      find: jest.fn().mockResolvedValue([new Customer()]),
    }
    service = module.get<CustomerService>(CustomerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      const customerService = new CustomerService(mockCustomerModel as any)

      const result = await customerService.createCustomer(createMockCustomer)

      expect(result).toEqual(mockCustomer)
      expect(mockCustomerModel.create).toHaveBeenCalledWith(createMockCustomer)
    })
  })
})
